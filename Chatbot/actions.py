# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"
"""
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionProvideCourse(Action):

    def name(self) -> Text:
        return "action_provide_course"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        language = tracker.get_slot("language") 
        courses = {"Python":"https://learnpython.org","Java":"https://www.codecademy.com/learn/learn-java","C++":"https://www.learncpp.com/"} 
        message = 'Te invito a ver <a href="'+courses[language]+'" target="_blank">este curso</a> de ' + language
        dispatcher.utter_message(text=message)

        return []
"""