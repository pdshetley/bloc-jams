var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };

var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

var albumMercury = {
     name: 'The Planets',
     artist: 'New Soldiers',
     label: 'Fortis',
     year: '1984',
     albumArtUrl: 'assets/images/album_covers/16.png',
     songs: [
         { name: 'Landing', length: '2:01' },
         { name: 'Can You Hear This?', length: '3:01' },
         { name: 'Cyber Storm', length: '3:29'},
         { name: 'Calm Seas', length: '3:34' },
         { name: 'Alien Social', length: '3:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
          '<tr class="album-view-song-item">'
      + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 };

var child = document.getElementByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    
    if (currentParent) {
        while (currentParent.className && currentParent.className != targetClass) {
        currentParent = currentParent.parentElement;    
    }
    if (currentParent.className == targetClass) {
        return currentParent;
    } else {
        alert("No parent with that class name found.");
    }
    } else {
        alert("No parent found.");
    }
};

findParentByClassName(noParent, 'banana');
fndParentByClassName(child, 'banana');
findParentClassName(child, 'album-view');

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
     
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
 
    } else if (currentlyPlayingSong === songItem.getAttribute ('data-song-number')) {
              songItem.innerHTML = playButtonTemplate;
              currentlyPlayingSong = null;
   
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlaying SongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlaying Song = songItem.getAttribute('data-song-number');
    }
        
};


// Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item') ;

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong - null;
 
window.onload = function() {
     setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);
            
            if (songItem.getAttribute('data-song-number) !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
    }
});
    
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML - songItemNumber;
            }
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
     
     var albums = [albumPicasso, albumMarconi, albumMercury];
     var index = 1;
        albumImage.addEventListener("click", function(event) {
            setCurrentAlbum(albums[index]);
            index++;
            if (index == albums.length) {
                index = 0;
            }
        });
 };