# Lyrics & Music API

## Get lyrics

<mark style="color:blue;">`GET`</mark> `https://api.ksoft.si/lyrics/search`

Searches for lyrics and returns a list of results.

#### Query Parameters

| Name       | Type    | Description                                                               |
| ---------- | ------- | ------------------------------------------------------------------------- |
| q          | string  | Search query.                                                             |
| text\_only | boolean | Default: false, if set to 'true' then it only searches inside the lyrcis. |
| limit      | integer | Default: 10, how many results should the endpoint return.                 |

#### Headers

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| Authorization | string | Authentication token |

{% tabs %}
{% tab title="200 List of tracks" %}

```javascript
{
  "total": 10000,
  "took": 6,
  "data": [
    {
      "artist": "Blackstreet",
      "artist_id": 11725,
      "album": "Another Level",
      "album_ids": "36778",
      "album_year": "1996",
      "name": "No Diggity",
      "lyrics": "Yeah\nYou know what\nI like the playettes\nNo diggity, no doubt\nPlay on playette, play on playette\nYo Dre, drop the verse\n\nIt's going down, fade to blackstreet\nThe homies got rb, collab' creations\nBump like acne, no doubt\nI put it down, never slouch\nAs long as my credit can vouch\nA dog couldn't catch me ass out\nTell me who can stop when dre makin' moves\nAttracting honeys like a magnet\nGiving 'em eargasms with my mellow accent\nStill moving this flavor\nWith the homies blackstreet and teddy\nThe original rump shakers\n\nShorty get down, good lord\nBaby got 'em up open all over town\nStrictly biz, she don't play around\nCover much ground, got game by the pound\nGetting paid is her forte\nEach and every day, true player way\nI can't get her out of my mind\nI think about the girl all the time\nEast side to the west side\nPushin' phat rides, it's no surprise\nShe got tricks in the stash\nStacking up the cash\nFast when it comes to the gas\nBy no means average\nShe's on when she's got to have it\nBaby, you're a perfect ten, I wanna get in\nCan I get down, so I can win\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nShe's got class and style\nStreet knowledge by the pound\nBaby never act wild, very low key on the profile\nCatchin' feelings is a no\nLet me tell you how it goes\nCurve's the words, spins the verbs\nLovers it curves so freak what you heard\nRollin' with the phatness\nYou don't even know what the half is\nYou gotta pay to play\nJust for shorty, bang-bang, to look your way\nI like the way you work it\nTrumped tight all day, every day\nYou're blowing my mind, maybe in time\nBaby, I can get you in my ride\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nHey oh, hey oh, hey oh, hey oh (hey yo that girl looks good)\nHey oh, hey oh, hey oh, hey oh (play on, play on, play on)\nHey oh, hey oh, hey oh, hey oh (you're my kind of girl)\nHey oh, hey oh, hey oh, hey oh (hey yay oh)\n\n'Cause that's my peeps and we row g\nFlyin' first class from new york city to blackstreet\nWhat you know about me, not a motherfuckin' thing\nCartier wooded frames sported by my shortie\nAs for me, icy gleaming pinky diamond ring\nWe be's the baddest clique up on the scene\nAin't you getting bored with these fake ass broads\nI shows and proves, no doubt, I be taking you, so\nPlease excuse, if I come across rude\nThat's just me and that's how the playettes got to be\nStay kickin' game with a capital G\nAxe the peoples on my block, I'm as real as can be\nWord is bond, faking jacks never been my flavor\nSo, teddy, pass the word to your nigga chauncey\nI be sitting in car, let's say around three thirty\nQueen pen and blackstreet, it's no diggity\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up, bag it up\n\nI like the way you work it\nNo diggity, I got to bag it up\n\nYeah, Come on\nJackie in full effect\nLisa in full effect\nNicky in full effect\nTomeka in full effect\nLadies in full effect\nAin't nothing goin' on but the rent\nYeah play on playette, play on playette\nPlay on play on, play on play on\n'Cause I like it\nNo diggity, no doubt, yeah\nBlackstreet productions\nWe out, we out right\nWe out, we out",
      "search_str": "Blackstreet No Diggity",
      "album_art": "https://api.storage.ksoft.si/album/36778/1991438-4822.jpg",
      "popularity": 387354,
      "singalong": [
        {
          "lrc_timestamp": "[00:00.00]",
          "milliseconds": "0",
          "duration": "1660",
          "line": "Yeah"
        },
        {
          "lrc_timestamp": "[00:01.66]",
          "milliseconds": "1660",
          "duration": "2070",
          "line": "You know what"
        },
        {
          "lrc_timestamp": "[00:03.73]",
          "milliseconds": "3730",
          "duration": "3130",
          "line": "I like the playettes"
        },
        {
          "lrc_timestamp": "[00:06.86]",
          "milliseconds": "6860",
          "duration": "2770",
          "line": "No diggity, no doubt"
        },
        {
          "lrc_timestamp": "[00:09.63]",
          "milliseconds": "9630",
          "duration": "5830",
          "line": "Play on playette, play on playette"
        },
        {
          "lrc_timestamp": "[00:15.46]",
          "milliseconds": "15460",
          "duration": "5730",
          "line": "Yo Dre, drop the verse"
        },
        {
          "line": ""
        },
        {...}
      ],
      "meta": {
        "spotify": {
          "artists": [
            "2P3cjUru4H3fhSXXNxE9kA",
            "6DPYiyq5kWVQS4RGwxzPC7",
            "0VbIlorLz3I5SEtIsc5vAr"
          ],
          "track": "6MdqqkQ8sSC0WB4i8PyRuQ",
          "album": "2zGZLQiFl9UubtrVmtIkbi"
        },
        "deezer": {
          "artists": [
            "1861",
            "763",
            "450477"
          ],
          "track": "916496",
          "album": "103254"
        },
        "artists": [
          {
            "name": "Dr. Dre",
            "is_primary": false,
            "id": 25053
          },
          {
            "name": "Blackstreet",
            "is_primary": true,
            "id": 11725
          }
        ],
        "other": {
          "gain": -12,
          "bpm": 88.7
        }
      },
      "id": "1991438",
      "search_score": 30.034847,
      "url": "https://lyrics.ksoft.si/song/1991438/Blackstreet-No-Diggity"
    }
  ]
}
```

{% endtab %}

{% tab title="404 Empty list" %}

```javascript
{
    "total": 0,
    "took": 32,
    "data": []
}
```

{% endtab %}
{% endtabs %}

## Music Recommendations

<mark style="color:green;">`POST`</mark> `https://api.ksoft.si/music/recommendations`

Retrieves music recommendations based on tracks user inputs. POST Request in **JSON** format only.

#### Headers

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| Authorization | string | Authentication token |

#### Request Body

| Name            | Type    | Description                                                                                                                                                                                                                                                                                                          |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tracks          | array   | JSON List or comma-separated list of input tracks. Content of the list depends on selected provider.                                                                                                                                                                                                                 |
| youtube\_token  | string  | Recommended. YouTube v3 API token.                                                                                                                                                                                                                                                                                   |
| limit           | integer | How many tracks to return. Defaults to 5. Valid range: 1-5                                                                                                                                                                                                                                                           |
| recommend\_type | string  | <p>Which data type to return.<br> - <code>track</code> - returns a list of track objects<br> - <code>youtube\_link</code> - returns a list of youtube links<br> - <code>youtube\_id</code> - returns a list of YouTube IDs</p>                                                                                       |
| provider        | string  | <p>Format in which you'll provide tracks. Can be:<br> - <code>youtube</code> - For list of YouTube links<br> - <code>youtube\_ids</code> - For list of YouTube video IDs<br> - <code>youtube\_titles</code> - For list of YouTube titles (faster)<br> - <code>spotify</code> - For list of Spotify IDs (fastest)</p> |

{% tabs %}
{% tab title="200 Returns 20 recommendations based on the input. Response has been shortened." %}

```javascript
{
    "provider": "youtube_ids",
    "total": 20,
    "tracks": [
        {
            "youtube": {
                "id": "dClJ5j0sm5c",
                "link": "https://www.youtube.com/watch?v=dClJ5j0sm5c",
                "title": "Fakear - Neptune",
                "thumbnail": "https://i.ytimg.com/vi/dClJ5j0sm5c/mqdefault.jpg",
                "description": "Fakear - Sauvage EP Vinyl/Stream/Download: https://Nowadays.lnk.to/Fakear-Sauvage Follow Fakear: http://www.facebook.com/fakear ..."
            },
            "spotify": {
                "id": "5eXQ1TwlcoKp5znwG1XfWg",
                "album": {
                    "name": "Sauvage",
                    "album_art": "https://i.scdn.co/image/98209f1f47fd70c7dbb4509926dafdf37398de2f",
                    "link": "https://open.spotify.com/album/6qmbzitgyDQXnF74bHrCPZ"
                },
                "artists": [
                    {
                        "name": "Fakear",
                        "link": "https://open.spotify.com/artist/4eFImh8D3F15dtZk0JQlpT"
                    }
                ],
                "name": "Neptune",
                "link": "https://open.spotify.com/track/5eXQ1TwlcoKp5znwG1XfWg"
            },
            "name": "Fakear - Neptune"
        },
        {
            "youtube": {
                "id": "rTckmTrpgAM",
                "link": "https://www.youtube.com/watch?v=rTckmTrpgAM",
                "title": "Dooz Kawa - Le Bétail",
                "thumbnail": "https://i.ytimg.com/vi/rTckmTrpgAM/mqdefault.jpg",
                "description": "Message Aux Anges Noirs (2012) 3rd Lab http://cd1d.com/fr/album/message-aux-anges-noirs."
            },
            "spotify": {
                "id": "3dQCaXsHDRua98UQ4Nj76J",
                "album": {
                    "name": "Message aux anges noirs",
                    "album_art": "https://i.scdn.co/image/ac7da1c5cdb07ea23b7214279bdd66ecf1064e64",
                    "link": "https://open.spotify.com/album/1y6AstygSoD838A5owhjsu"
                },
                "artists": [
                    {
                        "name": "Dooz Kawa",
                        "link": "https://open.spotify.com/artist/4z8LvfxawVZLoLR1KTUzQL"
                    }
                ],
                "name": "Le bétail",
                "link": "https://open.spotify.com/track/3dQCaXsHDRua98UQ4Nj76J"
            },
            "name": "Dooz Kawa - Le bétail"
        },
        ...
    ]
}
```

{% endtab %}
{% endtabs %}

## Get artist by ID

<mark style="color:blue;">`GET`</mark> `https://api.ksoft.si/lyrics/artist/{id}/`

Retrieves all albums and songs by that artist.

#### Path Parameters

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| id   | integer | Artist ID, you can get it from the lyrics search |

#### Headers

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| Authorization | string | Authentication token |

{% tabs %}
{% tab title="200 " %}

```javascript
{
    "id": 28333,
    "name": "Eurythmics",
    "albums": [
        {
            "id": 88305,
            "name": "Other Songs",
            "year": 1970
        },
        {
            "id": 88287,
            "name": "Ultimate Collection",
            "year": 2005
        },
        {...}
    ],
    "tracks": [
        {
            "id": 680890,
            "name": "Revenge 2"
        },
        {
            "id": 680879,
            "name": "My Guy"
        },
        {...}
    ]
}
```

{% endtab %}

{% tab title="404 " %}

```javascript
{
    "code": 404,
    "error": true,
    "message": "not found"
}
```

{% endtab %}
{% endtabs %}

## Get album by ID

<mark style="color:blue;">`GET`</mark> `https://api.ksoft.si/lyrics/album/{id}/`

Retrieves artist name and all tracks in the album.

#### Path Parameters

| Name | Type    | Description                                     |
| ---- | ------- | ----------------------------------------------- |
| id   | integer | Album ID, you can get it from the lyrics search |

#### Headers

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| Authorization | string | Authentication token |

{% tabs %}
{% tab title="200 " %}

```javascript
{
    "id": 88287,
    "name": "Ultimate Collection",
    "year": 2005,
    "artist": {
        "id": 28333,
        "name": "Eurythmics"
    },
    "tracks": [
        {
            "id": 680840,
            "name": "Was It Just Another Love Affair?"
        },
        {
            "id": 680639,
            "name": "I Saved The World Today"
        },
        {...}
    ]
}
```

{% endtab %}

{% tab title="404 " %}

```javascript
{
    "code": 404,
    "error": true,
    "message": "not found"
}
```

{% endtab %}
{% endtabs %}

## Get track by ID

<mark style="color:blue;">`GET`</mark> `https://api.ksoft.si/lyrics/track/{id}/`

Get info about a song.

#### Path Parameters

| Name | Type    | Description                                                                        |
| ---- | ------- | ---------------------------------------------------------------------------------- |
| id   | integer | Track ID, you can get it from artist by id, album by id or lyrics search endpoints |

#### Headers

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| Authorization | string | Authentication token |

{% tabs %}
{% tab title="200 " %}

```javascript
{
    "name": "Would I Lie To You?",
    "artist": {
        "id": 28333,
        "name": "Eurythmics"
    },
    "albums": [
        {
            "id": 88252,
            "name": "Greatest Hits",
            "year": 1991
        },
        {
            "id": 88287,
            "name": "Ultimate Collection",
            "year": 2005
        },
        {...}
    ],
    "lyrics": "Would I lie to you?\nWould I lie to you honey?\nNow would I say something that wasn't true?\nI'm asking you sugar\nWould I lie to you?\n\nMy friends - know what's in store.\nI won't be here anymore.\nI've packed my bags\nI've cleaned the floor.\nWatch me walkin'.\nWalkin' out the door.\n\nBelieve me - I'll make it make it\nBelieve me - I'll make it make it\n\nWould I lie to you?\nWould I lie to you honey?\nNow would I say something that wasn't true?\nI'm asking you sugar\nWould I lie to you?\n\nTell you straight - no intervention.\nTo your face - no deception.\nYou're the biggest fake.\nThat much is true.\nHad all I can take.\nNow I'm leaving you\n\nBelieve me - I'll make it make it\nBelieve me - I'll make it make it\n\nWould I lie to you?\nWould I lie to you honey?\nNow would I say something that wasn't true?\nI'm asking you sugar\nWould I lie to you?\n\nWould I lie to you?\nWould I lie to you honey?\nNow would I say something that wasn't true?\nI'm asking you sugar\nWould I lie to you?\n\nMy friends - know what's in store.\nI won't be here anymore.\nI've packed my bags\nI've cleaned the floor.\nWatch me walkin'.\nWalkin' out the door.\n\nBelieve me - I'll make it make it\nBelieve me - I'll make it make it\n\nWould I lie to you?"
}
```

{% endtab %}

{% tab title="404 " %}

```javascript
{
    "code": 404,
    "error": true,
    "message": "not found"
}
```

{% endtab %}
{% endtabs %}
