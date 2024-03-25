import re
from nltk.corpus import stopwords

class Preprocessor:
    def __init__(self):
        """
        Initialize Preprocessor class with keywords and stopwords.
        """
        self.__keywords = [
            'advanced', 'alm', 'analyst', 'analyse', 'api', 'app', 'application', 'architecture', 'arm',
            'asset', 'automation', 'aws', 'azure', 'ba', 'bi', 'big', 'bnppf', 'c', 'cd', 'central', 'ci',
            'cloud', 'code', 'cognos', 'container', 'crisp', 'culture', 'customer', 'dashboard', 'data',
            'databricks', 'datalake', 'datasets', 'dax', 'db', 'dbt', 'deepdive', 'delta', 'design',
            'desktop', 'develop', 'devops', 'dimensional', 'docker', 'dynamic', 'ecosystem', 'emr',
            'engineer', 'environment', 'erp', 'etl', 'etp', 'excel', 'experience', 'factory', 'flow', 'flow', 'gen',
            'git', 'govern', 'handle', 'hr', 'hub', 'ict', 'infrastructure', 'innovation', 'insight',
            'integration', 'intelligence', 'interface', 'iot', 'java', 'kibana', 'lake', 'lambda', 'language', 'large',
            'layer', 'learn', 'level', 'linux', 'ms', 'machine', 'maintain', 'manage', 'manipulate', 'mart',
            'microsoft', 'migrate', 'model', 'mongo', 'neo', 'operation', 'optimization', 'oracle', 'orchestrate', 'package',
            'paginated', 'panda', 'pipeline', 'platform', 'power', 'practice', 'prepare', 'process', 'procure', 'product', 'program',
            'project', 'qliksense', 'quality', 'query', 'report', 'requirement', 'roadmap', 'row', 's3',
            'safe', 'sagemaker', 'scalable', 'security', 'semi', 'service', 'setup', 'shiny', 'signal', 'skill',
            'solution', 'specialist', 'sql', 'ssis', 'ssms', 'stack', 'strategic', 'strategy', 'stream', 'structured',
            'studio', 'synapse', 'tech', 'tool', 'kit', 'topdesk', 'transform', 'ux', 'value', 'vault', 'visual',
            'vpc', 'warehouse', 'wifi', 'workspace', 'wph', 'olap', 'oltp']
        self.__english_stopwords = set(stopwords.words('english'))
        self.__french_stopwords = set(stopwords.words('french'))
        self.__dutch_stopwords = set(stopwords.words('dutch'))

    def __get_tokens(self, text: str) -> str:
        """
        Tokenizes the given text.

        Args:
        text (str): The text to tokenize.

        Returns:
        list[str]: A list of tokens extracted from the text.
        """
        for pattern in [r'\r', r'\n', r'[^A-Za-z0-9\s]', r'\s+']:
            text = re.sub(pattern, ' ', text)
        text = text.lower()
        text = text.strip()
        arr = text.split(' ')
        return arr

    def __get_interesting_tokens(self, tokens: list[str]) -> list[str]:
        """
        Filters tokens based on predefined keywords.

        Args:
        tokens (list[str]): List of tokens to filter.

        Returns:
        list[str]: Filtered list of tokens containing only interesting tokens.
        """
        interesting_tokens = []
        for token in tokens:
            for keyword in self.__keywords:
                if token in keyword:
                    interesting_tokens.append(token)
        return list(set(interesting_tokens))

    def __filter_stopwords(self, tokens: list[str]) -> list[str]:
        """
        Removes stopwords from the list of tokens.

        Args:
        tokens (list[str]): List of tokens to filter.

        Returns:
        list[str]: Filtered list of tokens with stopwords removed.
        """
        tokens = [token for token in tokens if token not in self.__english_stopwords]
        tokens = [token for token in tokens if token not in self.__french_stopwords]
        tokens = [token for token in tokens if token not in self.__dutch_stopwords]
        return tokens

    def preprocess(self, email: any) -> dict:
        """
        Preprocesses the text of an email by tokenizing, filtering based on keywords, and removing stopwords.

        Args:
        email (any): The email object containing text to preprocess.

        Returns:
        list[str]: Preprocessed tokens sorted alphabetically.
        """
        text = email.get('text_body', '')
        tokens = self.__get_tokens(text)
        interesting_tokens = self.__get_interesting_tokens(tokens)
        preprocessed_tokens = self.__filter_stopwords(interesting_tokens)
        preprocessed_tokens.sort()
        email['keywords'] = preprocessed_tokens
        return email