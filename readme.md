![See spotify image](images/spotify-query.png)
![See artist image](images/artists-query.png)
![See movie image](images/movie-query.png)
![See output image](images/text-output.png)

In createing this nodeJs console application, I used the spotify Api, to make calls to  these the last two Apis I used axios. 

I also used the "Fs" package to append the respose data to a text file accordingly.

I utilized "process.argv" to obtain the proper index to for the search query and to have three different strings to use when calling thier respective functions which allows for the execution of the "spotify", "OMbd" and "bands in town" functions