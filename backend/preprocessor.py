from transformers import pipeline
import time
from concurrent.futures import ThreadPoolExecutor
import psutil

# ... (your existing code)

#memory usage
#def print_memory_usage():
#    process = psutil.Process()
#    memory_info = process.memory_info()
#    print(f"Memory Usage: {memory_info.rss / 1024 / 1024:.2f} MB")


#bert clasification
token_skill_classifier = pipeline(model="jjzha/jobbert_skill_extraction", aggregation_strategy="first")
token_knowledge_classifier = pipeline(model="jjzha/jobbert_knowledge_extraction", aggregation_strategy="first")

mails = [
{
"title": "Initial Inquiry - Pool Project",
"content": '''Dear Anika Janssen,

I hope this email finds you well. My name is Stefan Meerman, and I am currently working on a pool project that involves [brief description of the project, e.g., monitoring water temperature, chemical levels, and pool equipment].

After researching potential solutions, I came across your expertise in Python programming and heard positive feedback about your work. I am reaching out to inquire if you would be interested in developing a Python program tailored to the specific needs of my pool project.

Here are some key features I envision for the program:

Real-time Monitoring: The program should be able to collect and display real-time data on water temperature, chemical levels, and the status of pool equipment.

Alerts and Notifications: Implement a system to send alerts or notifications when certain parameters fall outside the desired range, ensuring prompt action can be taken.

Data Logging: Create a database or log file to store historical data for future analysis and trend tracking.

User-Friendly Interface: Develop a user-friendly interface that allows easy navigation and interaction with the program.

I understand that this is a specialized project, and I would appreciate the opportunity to discuss the details further. If you are available, I would be happy to set up a meeting, either in person or via a video call, to provide more context and answer any questions you may have.

Additionally, I am interested in understanding your pricing structure and estimated timeline for completing the project. Please feel free to share any relevant details or requirements you may need from my end.

Thank you for considering my request. I am excited about the possibility of working together on this project and look forward to hearing from you soon.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com'''
},
{
"title": "Follow Up - Pool Project Details",
"content": '''Dear Lara Koster,

I hope this email finds you well. My name is Stefan Meerman, and I recently reached out to discuss the development of a Python program for my pool project. I understand that you have a busy schedule, and I appreciate your time in considering my request.

I wanted to follow up on our previous communication and provide additional details to help you better understand the scope and requirements of the project:

Project Scope Recap:

The pool project involves a lot of work.
Discussion Availability:

I am available for a meeting, either in person or via a video call, to discuss the project in more detail. Please let me know a time that works best for you, and I will ensure to accommodate your schedule.
Clarification on Pricing and Timeline:

I am interested in understanding your pricing structure for this type of project and getting an estimate of the timeline for completion. Any additional information or requirements you may have from my end would be valuable.
Project Documentation:

If needed, I can provide additional documentation or specifications to clarify any aspects of the project.
I believe your expertise will greatly contribute to the success of this project, and I am eager to move forward with the development phase. Your insights and recommendations are highly valued.

Thank you once again for considering my request. I am looking forward to your response and the possibility of working together on this exciting project.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com'''
},
{
"title": "Project Clarification - Detailed Specifications Attached",
"content": '''Dear Maarten Vogels,

I trust this email finds you in good spirits. I appreciate your prompt response and interest in assisting with the Python program development for my pool project. To provide further clarity and ensure we are aligned on the project requirements, I would like to share additional details:

Detailed Project Specifications:

I have prepared a comprehensive document outlining the detailed specifications for the Python program. This document covers aspects such as data input sources, expected output formats, and specific functionalities required for real-time monitoring, alerts, data logging, and the user interface. Please find the attached document for your review.
Preferred Development Frameworks:

If you have a preferred development framework or libraries for this type of project, I am open to your recommendations. Alternatively, I trust your expertise in selecting the most suitable tools based on the project requirements.
Testing and Feedback Loop:

I believe in the importance of collaboration and would appreciate your thoughts on the testing process. I envision a feedback loop where we can review progress, make any necessary adjustments, and ensure the final program meets the desired specifications.
Availability for Discussion:

I am available for a meeting at your earliest convenience to discuss any questions you may have and to provide further context on the project. Please let me know a time that works for you, and I will adjust my schedule accordingly.
I understand that projects of this nature require a thorough understanding, and I want to ensure that we start on a solid foundation. Your input and expertise are invaluable, and I look forward to working closely with you throughout the development process.

Thank you for your time and consideration. I am eager to hear your feedback and discuss the next steps.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com
[Attached: Detailed Project Specifications Document]'''
},
{
"title": "Reintroducing Myself - New Opportunity",
"content": '''Dear Karin Nieuwenhuis,

I hope this email finds you well. My name is Stefan Meerman, and I am currently working on a pool project that involves [brief description of the project, e.g., monitoring water temperature, chemical levels, and pool equipment].

After researching potential solutions, I came across your expertise in Python programming and heard positive feedback about your work. I am reaching out to inquire if you would be interested in developing a Python program tailored to the specific needs of my pool project.

Here are some key features I envision for the program:

Real-time Monitoring: The program should be able to collect and display real-time data on water temperature, chemical levels, and the status of pool equipment.

Alerts and Notifications: Implement a system to send alerts or notifications when certain parameters fall outside the desired range, ensuring prompt action can be taken.

Data Logging: Create a database or log file to store historical data for future analysis and trend tracking.

User-Friendly Interface: Develop a user-friendly interface that allows easy navigation and interaction with the program.

I understand that this is a specialized project, and I would appreciate the opportunity to discuss the details further. If you are available, I would be happy to set up a meeting, either in person or via a video call, to provide more context and answer any questions you may have.

Additionally, I am interested in understanding your pricing structure and estimated timeline for completing the project. Please feel free to share any relevant details or requirements you may need from my end.

Thank you for considering my request. I am excited about the possibility of working together on this project and look forward to hearing from you soon.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com'''
},
{
"title": "Follow Up - Additional Project Insights",
"content": '''Dear Paul Barendregt,

I hope this email finds you well. My name is Stefan Meerman, and I recently reached out to discuss the development of a Python program for my pool project. I understand that you have a busy schedule, and I appreciate your time in considering my request.

I wanted to follow up on our previous communication and provide additional details to help you better understand the scope and requirements of the project:

Project Scope Recap:

The pool project involves [briefly reiterate the main features, e.g., real-time monitoring, alerts, data logging, and a user-friendly interface].
Discussion Availability:

I am available for a meeting, either in person or via a video call, to discuss the project in more detail. Please let me know a time that works best for you, and I will ensure to accommodate your schedule.
Clarification on Pricing and Timeline:

I am interested in understanding your pricing structure for this type of project and getting an estimate of the timeline for completion. Any additional information or requirements you may have from my end would be valuable.
Project Documentation:

If needed, I can provide additional documentation or specifications to clarify any aspects of the project.
I believe your expertise will greatly contribute to the success of this project, and I am eager to move forward with the development phase. Your insights and recommendations are highly valued.

Thank you once again for considering my request. I am looking forward to your response and the possibility of working together on this exciting project.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com'''
},
{
"title": "Providing Complete Project Overview - Ready For Collaboration",
"content": '''Dear Femke Willems,

I trust this email finds you in good spirits. I appreciate your prompt response and interest in assisting with the Python program development for my pool project. To provide further clarity and ensure we are aligned on the project requirements, I would like to share additional details:

Detailed Project Specifications:

I have prepared a comprehensive document outlining the detailed specifications for the Python program. This document covers aspects such as data input sources, expected output formats, and specific functionalities required for real-time monitoring, alerts, data logging, and the user interface. Please find the attached document for your review.
Preferred Development Frameworks:

If you have a preferred development framework or libraries for this type of project, I am open to your recommendations. Alternatively, I trust your expertise in selecting the most suitable tools based on the project requirements.
Testing and Feedback Loop:

I believe in the importance of collaboration and would appreciate your thoughts on the testing process. I envision a feedback loop where we can review progress, make any necessary adjustments, and ensure the final program meets the desired specifications.
Availability for Discussion:

I am available for a meeting at your earliest convenience to discuss any questions you may have and to provide further context on the project. Please let me know a time that works for you, and I will adjust my schedule accordingly.
I understand that projects of this nature require a thorough understanding, and I want to ensure that we start on a solid foundation. Your input and expertise are invaluable, and I look forward to working closely with you throughout the development process.

Thank you for your time and consideration. I am eager to hear your feedback and discuss the next steps.

Best regards,

Stefan Meerman
+31612345678 | s.meerman@example.com
[Attached: Detailed Project Specifications Document]'''
}
]


#TODO: persoonlijke info uit mail halen
#TODO: werkwoorden veralgemenen

#parse results to json-like list
def aggregate_span(results):
    new_results = []
    current_result = results[0]

    for result in results[1:]:
        if result["start"] == current_result["end"] + 1:
            current_result["word"] += " " + result["word"]
            current_result["end"] = result["end"]
        else:
            new_results.append(current_result)
            current_result = result

    new_results.append(current_result)

    return new_results

#run the model
def classify_text(mail):
    start_time_s = time.time()
    output_skills = token_skill_classifier(mail['content'])
    for result in output_skills:
        if result.get("entity_group"):
            result["entity_type"] = "Skill"
            del result["entity_group"]
    end_time_s = time.time()
    classification_time_s = end_time_s - start_time_s

    start_time_k = time.time()
    output_knowledge = token_knowledge_classifier(mail['content'])
    for result in output_knowledge:
        if result.get("entity_group"):
            result["entity"] = "Knowledge"
            del result["entity_group"]
    end_time_k = time.time()
    classification_time_k = end_time_k - start_time_k

    if len(output_skills) > 0:
        output_skills = aggregate_span(output_skills)
    if len(output_knowledge) > 0:
        output_knowledge = aggregate_span(output_knowledge)
    
    # aggregate skills and knowledge together to one list
    entities = output_skills + output_knowledge

    return {"title": mail['title'], "text": mail['content'], "entities": entities, "classification_time_skills": classification_time_s, "classification_time_knowledge": classification_time_k}

def ner_parallel(mails):
    start_time = time.time()

    with ThreadPoolExecutor() as executor:
        results = list(executor.map(classify_text, mails))

    end_time = time.time()
    classification_time = end_time - start_time
    print(f"Total time elapsed for parallel processing: {classification_time}s\n")

    return results


output_results = ner_parallel(mails)
json_data = {}

for i, result in enumerate(output_results, 1):
    #print_memory_usage()
    keywords = []
    for entity in result['entities']:
        #add only entities with a certainty above 85%
        if(entity['score'] > 0.85):
            keywords.append({'word': entity['word'], 'score': entity['score']})
    json_data[f'mail_{i}'] = {'title': result['title'], 'keywords': keywords}

print(json_data)