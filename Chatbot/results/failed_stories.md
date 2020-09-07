## happy path 1 (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* greet: hello there!   <!-- predicted: deny: hello there! -->
    - utter_greet   <!-- predicted: utter_goodbye -->
* mood_great: amazing
    - utter_happy


## happy path 2 (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* greet: hello there!   <!-- predicted: deny: hello there! -->
    - utter_greet   <!-- predicted: utter_goodbye -->
* mood_great: amazing
    - utter_happy
* goodbye: bye-bye!   <!-- predicted: mood_great: bye-bye! -->
    - utter_goodbye   <!-- predicted: utter_happy -->


## sad path 1 (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* greet: hello   <!-- predicted: deny: hello -->
    - utter_greet   <!-- predicted: utter_goodbye -->
* mood_unhappy: not good   <!-- predicted: deny: not good -->
    - utter_cheer_up   <!-- predicted: utter_goodbye -->
    - utter_did_that_help
* affirm: yes
    - utter_happy


## sad path 2 (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* greet: hello   <!-- predicted: deny: hello -->
    - utter_greet   <!-- predicted: utter_goodbye -->
* mood_unhappy: not good   <!-- predicted: deny: not good -->
    - utter_cheer_up   <!-- predicted: utter_goodbye -->
    - utter_did_that_help
* deny: not really
    - utter_goodbye


## sad path 3 (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* greet: hi   <!-- predicted: affirm: hi -->
    - utter_greet   <!-- predicted: utter_happy -->
* mood_unhappy: very terrible
    - utter_cheer_up
    - utter_did_that_help
* deny: no
    - utter_goodbye


## say goodbye (/tmp/tmpw8684nxw/a04569df67c94cfda8189a3c7ddcde63_conversation_tests.md)
* goodbye: bye-bye!   <!-- predicted: mood_great: bye-bye! -->
    - utter_goodbye   <!-- predicted: utter_happy -->


