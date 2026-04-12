# Date/Time:
2026-03-19 16:27

# Tool:
GitHub Copilot

# Prompt/Command:
Integrate frontend of collaboration service to the frontend of the whole project

# Output Summary:
Replicate mock frontend of collaboration service to frontend of the whole project together and correct the backend routes and imports

# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirmed the functionality and UI features of the collaboration page


# Date/Time:
2026-03-23 11:34

# Tool:
GitHub Copilot

# Prompt/Command:
Chatbox is too big, make it fit to the remaining space on the right side of the collaboration page. Also, if I am sending the message, make my username and timestamp aligned to the right and if its by the other user then align to the left

# Output Summary:
Layout of collaboration page is adjusted with chat panel resized to fit the remaining space on the right. Chat messages are correctly aligned

# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes


# Date/Time:
2026-03-23 16:14

# Tool:
GitHub Copilot

# Prompt/Command:
Implement user presence in participant list by keeping track of room participant in the redis collab and update it whenever user leaves or join

# Output Summary:
Added participantUsername as a field in the collab redis. Added functions that tracks users leaving and joining the room. keep tracks of the participant list while dynamically changing  the list based on users leaving and joining the room.

# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes and test edge cases 


# Date/Time:
2026-03-24 11:23

# Tool:
GitHub Copilot

# Prompt/Command:
After getting room data, use the difficulty and topic to randomly select a question from the question service and replace roomData.question

# Output Summary:
Created an API workflow that fetches question from question-service

# Action Taken:
- [ ] Accepted as-is
- [x] Modified
- [ ] Rejected

# Author Notes:
Question that they generate for each user is different due to Math.random(). Made selection deterministic by hashing roomId and using it as the seed. Open the application on localhost and visually confirm the UI changes and test edge cases 

# Date/Time:
2026-03-25 20:13

# Tool:
GitHub Copilot

# Prompt/Command:
Make it such that when one user press the leave toom button, create a pop up notification using toast to the other user that the user has left and remove the user from the participant list

# Output Summary:
Reuse collaboration chat message websocket by creating a user_left websocket path and send a message to the other user when user leaves, triggering a alert toast


# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes and test edge cases 

# Date/Time:
2026-04-05 12:32

# Tool:
GitHub Copilot

# Prompt/Command:
When i close the page and reopen the page, there is a huge recursive message of user leaving and joining the page, explain the cause and fix the bug

# Output Summary:
Provided explanation on what is required to fix the bug. Memoized functions using useCallBack to stop calling of functions on each render


# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes and test edge cases 


# Date/Time:
2026-04-05 16:56

# Tool:
GitHub Copilot

# Prompt/Command:
Include images below the question description if question retrieve has images and make the question description UI look better.

# Output Summary:
Added imageUrl as one of the variables received from question service and display it on the frontend. Added sentence separation and border for question description.


# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes and test edge cases 

# Date/Time:
2026-04-07 18:36

# Tool:
GitHub Copilot

# Prompt/Command:
Include a 60s window where the rooms will not be deleted to allow users that close page or refresh to enter back

# Output Summary:
Create a room timer mapping to store rooms that are required to be closed and set a timeout of 60s on the delete room function. When the user re-enters to the collaboration page, the mapping is deleted and the delete function does not run.


# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Open the application on localhost and visually confirm the UI changes and test edge cases 

# Date/Time:
2026-04-08 13:16

# Tool:
GitHub Copilot

# Prompt/Command:
Based on the code in the collaboration service, generate a detailed ReadMe

# Output Summary
Detailed ReadMe generated, showing all the different functions and API routes and parameters

# Action Taken:
- [x] Accepted as-is
- [ ] Modified
- [ ] Rejected

# Author Notes:
Read through and verified the correctness of the things written
