from transformers import pipeline
from googletrans import Translator

import os
import re

import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords, words

class Preprocessor:
    """
    This class contains the basic preprocessor pipeline that's used to extract keywords themed around skills.

    Attributes:
        _dir_skill (str): The directory path where the skill preprocessor model is stored.
        _dir_knowledge (str): The directory path where the knowledge preprocessor model is stored.
        _window_size (int): The window size used in the preprocessor pipeline.
        __words (set): Set of English words.
        __lemmatizer (WordNetLemmatizer): Instance of WordNetLemmatizer for lemmatization.

    Methods:
        __init__: Initializes the Preprocessor class with default or user-specified parameters.
        preprocess_input: Preprocesses input and gives skills & knowledge back.
    """
    def __init__(self, window_size: int = 8,
                 preprocessor_dir_skill: str = "./preprocessor/skill/",
                 preprocessor_dir_knowledge: str = "./preprocessor/knowledge/"):
        """
        Initializes the Preprocessor class with default or user-specified parameters.

        Args:
            window_size (int): The window size used in the preprocessor pipeline. Default is 8.
            preprocessor_dir_skill (str): The directory path where the skill preprocessor model is stored.
                Default is "./preprocessor/skill/".
            preprocessor_dir_knowledge (str): The directory path where the knowledge preprocessor model is stored.
                Default is "./preprocessor/knowledge/".
        """
        self._window_size = window_size

        self._dir_skill = preprocessor_dir_skill
        self._dir_knowledge = preprocessor_dir_knowledge
        self._skill_preprocessor = self.__load_model(dir=self._dir_skill, model_name="jjzha/jobbert_skill_extraction")
        self._knowledge_preprocessor = self.__load_model(dir=self._dir_knowledge,
                                                         model_name="jjzha/jobbert_knowledge_extraction")

        # region Initialize NLTK resources
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('wordnet', quiet=True)
        nltk.download('words', quiet=True)
        # endregion

        self.__words = set(words.words('en') + stopwords.words('english'))
        self.__lemmatizer = WordNetLemmatizer()

    def __load_model(self, dir: str, model_name: str):
        """
        Loads a preprocessor model from the specified directory.

        Args:
            dir (str): The directory path where the preprocessor model is stored.
            model_name (str): The name of the preprocessor model to load.

        Returns:
            object: The preprocessor model loaded from the specified directory.
        """
        if not os.path.exists(dir) or not os.listdir(dir):
            token_classifier = pipeline(model=model_name, aggregation_strategy="first")
            token_classifier.save_pretrained(dir)
        return pipeline(model=dir, task="ner")

    def __regex_privacy(self, text: str) -> str:
        """
        Applies regex patterns to remove privacy-sensitive information from text.

        Args:
            text (str): The input text.

        Returns:
            str: The text with privacy-sensitive information removed.
        """
        # Define regex patterns to remove privacy-sensitive information
        patterns = [
            r'\r',  # Remove carriage return
            r'\n',  # Remove newline
            r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)',
            # Remove URLs
            r'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',  # Remove phone numbers
            r'\d',  # Remove digits
            r'-',  # Remove hyphens
            r'[\[\](){}<>]',  # Remove brackets and parentheses
            r'[,.;:!?&+_\/]'  # Remove common punctuation
        ]

        # Apply each pattern to the text
        for pattern in patterns:
            text = re.sub(pattern, ' ', text)
        return text

    def __clean_text(self, text: str) -> str:
        """
        Cleans the text by removing privacy-sensitive information and multiple spaces.

        Args:
            text (str): The input text.

        Returns:
            str: The cleaned text.
        """
        text_multi_space = text.replace(' ', '_')
        text_cleaned = self.__regex_privacy(text_multi_space)
        return text_cleaned

    def __translate_to_english(self, text: str) -> str:
        """
        Translates text to English using Google Translate API.

        Args:
            text (str): The input text.

        Returns:
            str: The translated text in English.
        """
        translator = Translator()
        translated_text = translator.translate(text, src='auto', dest='en').text
        return translated_text

    def __tokenize(self, text: str) -> list[str]:
        """
        Tokenizes, lemmatizes, and stems the text.

        Args:
            text (str): The input text.

        Returns:
            list[str]: The list of tokens after tokenization & lemmatization.
        """
        tokens = word_tokenize(text.lower())
        lemmatized_tokens = [self.__lemmatizer.lemmatize(token) for token in tokens]
        filtered_tokens = [token for token in lemmatized_tokens if token not in self.__words]
        return filtered_tokens

    def preprocess(self, email: dict) -> dict:
        """
        Preprocesses the input email to extract skills and knowledge.
        Args:
            email (dict): The input email to be preprocessed.
        Returns:
            dict: A dictionary containing lists of dictionaries,
                where each dictionary represents a skill or knowledge term with its corresponding score and type.
                The dictionary has three keys: 'skill', 'knowledge', and 'keywords', each containing a list of dictionaries.
        """
        text = email.get('text_body', '')
        clean_text = self.__clean_text(text)
        text_en = self.__translate_to_english(clean_text)
        text_en_clean = self.__clean_text(text_en)
        tokens = self.__tokenize(text_en_clean)

        unique_tokens = list(set(tokens))

        # Process tokens using skill_preprocessor
        skill_output = [self._skill_preprocessor(' '.join(tokens[i - self._window_size:i + self._window_size])) for i in
                        range(self._window_size, len(tokens), self._window_size)]
        transformed_skill_output = [{'word': item['word'], 'type': 'skill'} for sublist in skill_output for item in
                                    sublist if sublist]

        # Process tokens using knowledge_preprocessor
        knowledge_output = [self._knowledge_preprocessor(' '.join(tokens[i - self._window_size:i + self._window_size]))
                            for i in range(self._window_size, len(tokens), self._window_size)]
        transformed_knowledge_output = [{'word': item['word'], 'type': 'knowledge'} for sublist in knowledge_output for
                                        item in sublist if sublist]

        email['skill'] = transformed_skill_output
        email['knowledge'] = transformed_knowledge_output
        email['keywords'] = unique_tokens
        email['rating'] = None

        return email