# Five Five-letter Words with Twenty-Five Unique Letters
Matt's video: https://www.youtube.com/watch?v=_-AfhLQfb6w  
Fred's video: https://www.youtube.com/watch?v=947Ewgue4DM  
I came across with Fred's video about optimizing Matt's code. He claimed that his code was 100k times faster, so I paused the video and saw what I could do. That resulted in the version 1 of code (main.js), which took 5 minutes 50 seconds to run.  
I then resumed the video, and found out that Fred used a bitfield word representation. With that inspiration, I modified the v1 of my code to use bitfield instead. That resulted in the v2 of my code (bitfield.js), which takes 12.4 seconds to run.  

## Current Records
```
Matt:                     30 days
Benjamin:                 15 minutes
My code v1 (main.js):     5 minutes 49.791 seconds
Fred:                     30 seconds
My code v2 (bitfield.js): 12.362 seconds
```

## Description of the files and how to run
The results are stored in result_readable.txt. If there are multiple words with the same set of alphabets, they will be surrounded with `[]`.  
There are also JSON files that can be used for further processing.  

To run this program, open your command line, install nodejs, and type `node bitfield.js` or `node main.js` and hit enter. Result files will be generated automatically after the program is done running.  