# VidTube Video Streaming Back-End App

The Web App designed is inspired by the renowned Youtube Video Streaming service.

## ✅ Features

### User Management

- Authentication using JWT Tokens.
- Register / Login User
- Upload and Stream Videos
- Update User Details (Name, Avatar, Cover Image etc)
- Get User Watch History

### Comments Management

- CRUD Operations on Video Comments.

### Likes Management

- Toggle Likes on Videos, Comments and Tweets.

### Playlist Management

- CRUD Operations on User Playlists.
- Add / Remove Videos from Playlists.

### Dashboard Access

- Get Channel Stats (Total Videos, Total Views, Subscribers List, Subscribed Channels List etc)
- Get Channel Videos

### Subscriptions Management

- Fetch Subscribers List
- Fetch Subscribed Channels List
- Toggle Subscription

### Tweets Management

- CRUD Operations on User Tweets.

### Videos Management

- CRUD Operations on User Videos.

## 🛠️ Tech Stack

- ExpressJs
- MongoDB
- NodeJs
- Cloudinary
- JWT
- Multer

## 🚀 Getting Started

As this is a Back-End only App, use of Postman is advised to access the routes. The Database documents are provided in a PDF File for testing purposes.

## 📸 Screenshots of Routes in Postman

![User Routes](./src/images/user.postman.png)
![Comments Routes](./src/images/comments.postman.png)
![Likes Routes](./src/images/likes.postman.png)
![Playlists Routes](./src/images/playlists.postman.png)
![Subscriptions Routes](./src/images/subscriptions.postman.png)
![Tweets Routes](./src/images/tweets.postman.png)
![HealthCheck Route](./src/images/healthCheck.postman.png)
![Dashboard Routes](./src/images/dashboard.postman.png)
![Videos Routes](./src/images/videos.postman.png)

## 🔗 Routes

Here is the list of all routes

### HealthCheck Route

```bash
GET api/v1/healthCheck
```

```json
{
  "statusCode": 200,
  "data": "OK",
  "message": "Health Check Passed",
  "success": true
}
```

### User Routes

#### 1. Register User

##### 📸 Screenshot
![Register User](./src/images/Register-User.png)

```bash
 POST api/v1/users/register
```

```json
{
  "statusCode": 201,
  "data": {
    "_id": "68b6c2e1589097d56d6ba306",
    "username": "user12",
    "email": "user12@test.com",
    "fullName": "User Twelve",
    "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1756807902/pw8p8aypwavjkpcb8isz.png",
    "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1756807904/rkqnbotso9iamufxamaa.jpg",
    "watchHistory": [],
    "createdAt": "2025-09-02T10:11:45.296Z",
    "updatedAt": "2025-09-02T10:11:45.296Z",
    "__v": 0
  },
  "message": "User Registered Successfully",
  "success": true
}
```

#### 2. Login User

```bash
POST api/v1/users/login
```
##### 📸 Screenshot
![Login User](./src/images/Login-User.png)
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "686cad45a41b4cd3b897909b",
      "username": "user1",
      "email": "user1@test.com",
      "fullName": "User One",
      "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1751952706/vdhuopcofliudjbkhfnw.png",
      "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1751952709/dyobf1i8fifkdqmwisnj.jpg",
      "watchHistory": ["686cbc62a41b4cd3b89790c8", "686cbecda41b4cd3b897911f"],
      "createdAt": "2025-07-08T05:31:49.494Z",
      "updatedAt": "2025-09-02T10:21:26.924Z",
      "__v": 2
    }
  },
  "message": "User Logged In Successfully",
  "success": true
}
```

#### 3. Logout User

```bash
POST api/v1/users/logout
```

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User Logged Out Successfully",
  "success": true
}
```

#### 4. Refresh Token

```bash
POST api/v1/users/refresh-token
```

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZjYWQ0NWE0MWI0Y2QzYjg5NzkwOWIiLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwidXNlcm5hbWUiOiJ1c2VyMSIsImZ1bGxOYW1lIjoiVXNlciBPbmUiLCJpYXQiOjE3NTY4MDg3MDUsImV4cCI6MTc1NjgxMjMwNX0.Ws7grn_8VjLofc_pMg6UwU_ugiqYYDNchy_tJKInjdQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODZjYWQ0NWE0MWI0Y2QzYjg5NzkwOWIiLCJpYXQiOjE3NTY4MDg3MDUsImV4cCI6MTc1Njg0NDcwNX0.qQXZl16u-D8NVao8IsR37s4rO76HtAED7O9bq6mrGeo"
  },
  "message": "Access Token Refreshed Successfully",
  "success": true
}
```

#### 5. Change Password

```bash
POST api/v1/users/change-password
```
##### 📸 Screenshot
![Change Password](./src/images/Change-Password.png)
```json
{
  "statusCode": 200,
  "data": {},
  "message": "Password Changed Successfully",
  "success": true
}
```

#### 6. Get Current User

```bash
GET api/v1/users/current-user
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cad45a41b4cd3b897909b",
    "username": "user1",
    "email": "user1@test.com",
    "fullName": "User One",
    "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1751952706/vdhuopcofliudjbkhfnw.png",
    "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1751952709/dyobf1i8fifkdqmwisnj.jpg",
    "watchHistory": ["686cbc62a41b4cd3b89790c8", "686cbecda41b4cd3b897911f"],
    "createdAt": "2025-07-08T05:31:49.494Z",
    "updatedAt": "2025-09-02T10:27:25.289Z",
    "__v": 2
  },
  "message": "Current User Details",
  "success": true
}
```

#### 7. Update Account Details

```bash
PATCH api/v1/users/update-account
```
##### 📸 Screenshot
![Update Account Details](./src/images/Update-Account-Details.png)
```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cad45a41b4cd3b897909b",
    "username": "user13",
    "email": "user13@test.com",
    "fullName": "User One",
    "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1751952706/vdhuopcofliudjbkhfnw.png",
    "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1751952709/dyobf1i8fifkdqmwisnj.jpg",
    "watchHistory": ["686cbc62a41b4cd3b89790c8", "686cbecda41b4cd3b897911f"],
    "createdAt": "2025-07-08T05:31:49.494Z",
    "updatedAt": "2025-09-02T10:30:26.007Z",
    "__v": 2
  },
  "message": "Account Details Updated Successfully",
  "success": true
}
```

#### 8. Update Avatar

```bash
PATCH api/v1/users/update-avatar
```
##### 📸 Screenshot
![Update Avatar](./src/images/Update-Avatar.png)
```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cad45a41b4cd3b897909b",
    "username": "user13",
    "email": "user13@test.com",
    "fullName": "User One",
    "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1756809949/z7ykrsbmdavezfwtqrb4.jpg",
    "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1751952709/dyobf1i8fifkdqmwisnj.jpg",
    "watchHistory": ["686cbc62a41b4cd3b89790c8", "686cbecda41b4cd3b897911f"],
    "createdAt": "2025-07-08T05:31:49.494Z",
    "updatedAt": "2025-09-02T10:45:49.961Z",
    "__v": 2
  },
  "message": "Avatar Updated Successfully",
  "success": true
}
```

#### 9. Update Cover Image

```bash
PATCH api/v1/users/update-cover-image
```
##### 📸 Screenshot
![Update Cover Image](./src/images/Update-Cover-Image.png)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cad45a41b4cd3b897909b",
    "username": "user13",
    "email": "user13@test.com",
    "fullName": "User One",
    "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1756809949/z7ykrsbmdavezfwtqrb4.jpg",
    "coverImage": "http://res.cloudinary.com/aaditya06/image/upload/v1756810051/tjlhczqj6vojtgpq4exl.jpg",
    "watchHistory": ["686cbc62a41b4cd3b89790c8", "686cbecda41b4cd3b897911f"],
    "createdAt": "2025-07-08T05:31:49.494Z",
    "updatedAt": "2025-09-02T10:47:32.409Z",
    "__v": 2
  },
  "message": "Cover Image Updated Successfully",
  "success": true
}
```

#### 10. User Profile

```bash
GET api/v1/users/profile/:username
```

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "686cad83a41b4cd3b897909f",
      "username": "user2",
      "fullName": "User Two",
      "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1751952768/smrq8yckyesn0an2zord.png",
      "totalSubscribers": 2,
      "totalSubscribedChannels": 5,
      "hasSubscribedToChannel": true
    }
  ],
  "message": "Channel Profile",
  "success": true
}
```

#### 11. Watch History

```bash
GET api/v1/users/watch-history
```

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "686cad45a41b4cd3b897909b",
      "username": "user13",
      "fullName": "User One",
      "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1756809949/z7ykrsbmdavezfwtqrb4.jpg",
      "watchHistory": [
        {
          "_id": "686cbc62a41b4cd3b89790c8",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956576/qerouopvrnzphdpdyjgm.mp4",
          "title": "Cyberpunk 2077 (1user1)",
          "owner": [
            {
              "_id": "686cad45a41b4cd3b897909b",
              "username": "user13",
              "fullName": "User One",
              "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1756809949/z7ykrsbmdavezfwtqrb4.jpg"
            }
          ]
        },
        {
          "_id": "686cbecda41b4cd3b897911f",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957195/bbkxalgm2rmwdyaetc4f.mp4",
          "title": "Cyberpunk 2077 (1user8)",
          "owner": [
            {
              "_id": "686cadeda41b4cd3b89790b7",
              "username": "user8",
              "fullName": "User Eight",
              "avatar": "http://res.cloudinary.com/aaditya06/image/upload/v1751952875/v4nejw2holiyrxhvpfq6.png"
            }
          ]
        }
      ]
    }
  ],
  "message": "Watch History fetched successfully",
  "success": true
}
```

### Comments Routes

#### 1.Get Video Comments

```bash
GET api/v1/comments/:videoId?page=2&limit=2
```
##### 📸 Screenshot
![Get Video Comments](./src/images/Get-Video-Comments.png)

```json
{
  "statusCode": 200,
  "data": {
    "docs": [
      {
        "_id": "686e1f11d90af82940c0b9aa",
        "content": "comment4 user4 video 1user1",
        "video": "686cbc62a41b4cd3b89790c8",
        "owner": "686cada8a41b4cd3b89790a7",
        "createdAt": "2025-07-09T07:49:37.577Z",
        "updatedAt": "2025-07-09T07:49:37.577Z",
        "__v": 0
      },
      {
        "_id": "686e1f1fd90af82940c0b9b5",
        "content": "comment5 user5 video 1user1",
        "video": "686cbc62a41b4cd3b89790c8",
        "owner": "686cadb7a41b4cd3b89790ab",
        "createdAt": "2025-07-09T07:49:51.549Z",
        "updatedAt": "2025-07-09T07:49:51.549Z",
        "__v": 0
      }
    ],
    "totalDocs": 11,
    "limit": 2,
    "page": 2,
    "totalPages": 6,
    "pagingCounter": 3,
    "hasPrevPage": true,
    "hasNextPage": true,
    "prevPage": 1,
    "nextPage": 3
  },
  "message": "Comments for the Video Returned",
  "success": true
}
```

#### 2.Add Video Comment

```bash
POST - POST api/v1/comments/:videoId
```
##### 📸 Screenshot
![Add Comment](./src/images/Add-Comment.png)
```json
{
  "statusCode": 201,
  "data": {
    "content": "comment1 user1 video 1user1",
    "video": "686cbc62a41b4cd3b89790c8",
    "owner": "686cad45a41b4cd3b897909b",
    "_id": "68b7c8d2eb077b8d235828f9",
    "createdAt": "2025-09-03T04:49:22.212Z",
    "updatedAt": "2025-09-03T04:49:22.212Z",
    "__v": 0
  },
  "message": "Comment created",
  "success": true
}
```

#### 4.Update Comment

```bash
PATCH api/v1/comments/:commentId
```
##### 📸 Screenshot
![Update Comment](./src/images/Update-Comment.png)

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cc0ce82e49d3d054af06d",
    "content": "comment3 user1 video 1user1",
    "video": "686cbcb5a41b4cd3b89790ce",
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-07-08T06:55:10.805Z",
    "updatedAt": "2025-09-03T04:52:24.400Z",
    "__v": 0
  },
  "message": "Comment Updated",
  "success": true
}
```

#### 4.Delete Comment

```bash
DELETE api/v1/comments/:commentId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cc0ce82e49d3d054af06d",
    "content": "comment2 user1 video 1user1",
    "video": "686cbcb5a41b4cd3b89790ce",
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-07-08T06:55:10.805Z",
    "updatedAt": "2025-09-03T04:54:02.530Z",
    "__v": 0
  },
  "message": "Comment Deleted",
  "success": true
}
```

### Like Routes

- POST api/v1/likes/video/:videoId (Toggle Video Like)

#### 1. Toggle Video Like

```bash
api/v1/likes/video/:videoId
```

```json
{
  "statusCode": 201,
  "data": {
    "video": "686cbe09a41b4cd3b89790fe",
    "likedBy": "686cad45a41b4cd3b897909b",
    "_id": "68b7ca81eb077b8d23582917",
    "createdAt": "2025-09-03T04:56:33.523Z",
    "updatedAt": "2025-09-03T04:56:33.523Z",
    "__v": 0
  },
  "message": "Liked Video",
  "success": true
}
```

#### 2. Toggle Comment Like

```bash
api/v1/likes/video/:commentId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cac5eb077b8d23582920",
    "comment": "686e1f60d90af82940c0b9e1",
    "likedBy": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T04:57:41.028Z",
    "updatedAt": "2025-09-03T04:57:41.028Z",
    "__v": 0
  },
  "message": "Unliked Comment",
  "success": true
}
```

#### 3. Toggle Tweet Like

```bash
api/v1/likes/video/:tweetId
```

```json
{
  "statusCode": 201,
  "data": {
    "tweet": "686e133607cf2c8627ed909e",
    "likedBy": "686cad45a41b4cd3b897909b",
    "_id": "68b7caf1eb077b8d23582929",
    "createdAt": "2025-09-03T04:58:25.867Z",
    "updatedAt": "2025-09-03T04:58:25.867Z",
    "__v": 0
  },
  "message": "Liked Tweet",
  "success": true
}
```

#### 4. Get All Liked Videos

```bash
GET api/v1/likes/liked-videos
```

```json
{
  "statusCode": 200,
  "data": {
    "docs": [
      {
        "_id": "686cbdcea41b4cd3b89790fb",
        "video": {
          "_id": "686cbdcea41b4cd3b89790fb",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956941/vumlgai3yridin7vgl3k.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/vumlgai3yridin7vgl3k.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (1user5)",
          "description": "Live Wallpaper (1user5)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cadb7a41b4cd3b89790ab",
          "createdAt": "2025-07-08T06:42:22.806Z",
          "updatedAt": "2025-07-08T06:42:22.806Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbdaaa41b4cd3b89790f2",
        "video": {
          "_id": "686cbdaaa41b4cd3b89790f2",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956904/gydkmvpyifwdtxlotfby.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/gydkmvpyifwdtxlotfby.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (2user4)",
          "description": "Live Wallpaper (2user4)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cada8a41b4cd3b89790a7",
          "createdAt": "2025-07-08T06:41:46.770Z",
          "updatedAt": "2025-07-08T06:41:46.770Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbd51a41b4cd3b89790e3",
        "video": {
          "_id": "686cbd51a41b4cd3b89790e3",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956815/qs07lapkywsdofdqwrxr.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qs07lapkywsdofdqwrxr.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (1user3)",
          "description": "Live Wallpaper (1user3)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad97a41b4cd3b89790a3",
          "createdAt": "2025-07-08T06:40:17.571Z",
          "updatedAt": "2025-07-08T06:40:17.571Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbd11a41b4cd3b89790d7",
        "video": {
          "_id": "686cbd11a41b4cd3b89790d7",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956750/oj8rsus4wppq4s9qythi.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/oj8rsus4wppq4s9qythi.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (1user2)",
          "description": "Live Wallpaper (1user2)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad83a41b4cd3b897909f",
          "createdAt": "2025-07-08T06:39:13.074Z",
          "updatedAt": "2025-07-08T06:39:13.074Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbd66a41b4cd3b89790e6",
        "video": {
          "_id": "686cbd66a41b4cd3b89790e6",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956835/xjmpgqawkqk0ryxpl1c4.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/xjmpgqawkqk0ryxpl1c4.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (2user3)",
          "description": "Live Wallpaper (2user3)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad97a41b4cd3b89790a3",
          "createdAt": "2025-07-08T06:40:38.154Z",
          "updatedAt": "2025-07-08T06:40:38.154Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbd97a41b4cd3b89790ef",
        "video": {
          "_id": "686cbd97a41b4cd3b89790ef",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956885/kwv5l2welugy3q9pzbfi.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/kwv5l2welugy3q9pzbfi.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (1user4)",
          "description": "Live Wallpaper (1user4)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cada8a41b4cd3b89790a7",
          "createdAt": "2025-07-08T06:41:27.363Z",
          "updatedAt": "2025-07-08T06:41:27.363Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbc62a41b4cd3b89790c8",
        "video": {
          "_id": "686cbc62a41b4cd3b89790c8",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956576/qerouopvrnzphdpdyjgm.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qerouopvrnzphdpdyjgm.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (1user1)",
          "description": "Live Wallpaper (1user1)",
          "views": 5,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad45a41b4cd3b897909b",
          "createdAt": "2025-07-08T06:36:18.087Z",
          "updatedAt": "2025-07-11T06:32:37.672Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbe09a41b4cd3b89790fe",
        "video": {
          "_id": "686cbe09a41b4cd3b89790fe",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956999/j2mawjywhkblptlvygwi.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/j2mawjywhkblptlvygwi.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (2user5)",
          "description": "Live Wallpaper (2user5)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cadb7a41b4cd3b89790ab",
          "createdAt": "2025-07-08T06:43:21.692Z",
          "updatedAt": "2025-07-08T06:43:21.692Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbcb5a41b4cd3b89790ce",
        "video": {
          "_id": "686cbcb5a41b4cd3b89790ce",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956660/tnlk6kclifcljafjvvls.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/tnlk6kclifcljafjvvls.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (2user1)",
          "description": "Live Wallpaper (2user1)",
          "views": 3,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad45a41b4cd3b897909b",
          "createdAt": "2025-07-08T06:37:41.972Z",
          "updatedAt": "2025-07-11T06:19:39.784Z",
          "__v": 0
        }
      },
      {
        "_id": "686cbd25a41b4cd3b89790da",
        "video": {
          "_id": "686cbd25a41b4cd3b89790da",
          "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956771/syca8w6az8rlyja1nsjn.mp4",
          "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/syca8w6az8rlyja1nsjn.jpg?_a=BAMAK+M20",
          "title": "Cyberpunk 2077 (2user2)",
          "description": "Live Wallpaper (2user2)",
          "views": 0,
          "duration": 30.033333,
          "isPublished": true,
          "owner": "686cad83a41b4cd3b897909f",
          "createdAt": "2025-07-08T06:39:33.233Z",
          "updatedAt": "2025-07-08T06:39:33.233Z",
          "__v": 0
        }
      }
    ],
    "totalDocs": 10,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  },
  "message": "All Liked Video fetched",
  "success": true
}
```

### Playlists Routes

#### 1. Create Playlist

```bash
POST api/v1/playlists/playlist/create-playlist
```
##### 📸 Screenshot
![Create Playlist](./src/images/Create-Playlist.png)
```json
{
  "statusCode": 201,
  "data": {
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos",
    "videos": [],
    "owner": "686cad45a41b4cd3b897909b",
    "_id": "68b7cb4beb077b8d2358292e",
    "createdAt": "2025-09-03T04:59:55.128Z",
    "updatedAt": "2025-09-03T04:59:55.128Z",
    "__v": 0
  },
  "message": "Playlist created successfully",
  "success": true
}
```

#### 2. Get User Playlists

```bash
GET api/v1/playlists/user-playlists/:userId
```

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "686e1893d90af82940c0b959",
      "name": "Assassins Creed Origins",
      "description": "All Trailer Videos",
      "videos": ["686cbcb5a41b4cd3b89790ce"],
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-07-09T07:21:55.915Z",
      "updatedAt": "2025-07-10T06:58:52.287Z",
      "__v": 3
    },
    {
      "_id": "68b7cb4beb077b8d2358292e",
      "name": "Assassins Creed Valhalla",
      "description": "All Trailer Videos",
      "videos": [],
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-09-03T04:59:55.128Z",
      "updatedAt": "2025-09-03T04:59:55.128Z",
      "__v": 0
    }
  ],
  "message": "Playlist fetched successfully for the user",
  "success": true
}
```

#### 3. Get Playlist By ID

```bash
GET api/v1/playlists/playlist/:playlistId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cb4beb077b8d2358292e",
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos",
    "videos": [],
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T04:59:55.128Z",
    "updatedAt": "2025-09-03T04:59:55.128Z",
    "__v": 0
  },
  "message": "Playlist fetched successfully for this ID",
  "success": true
}
```

#### 4. Add Video to Playlist

```bash
POST api/v1/playlists/playlist/:playlistId/video/:videoId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cb4beb077b8d2358292e",
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos",
    "videos": ["686cbcb5a41b4cd3b89790ce"],
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T04:59:55.128Z",
    "updatedAt": "2025-09-03T05:03:56.276Z",
    "__v": 1
  },
  "message": "Video added successfully to playlist",
  "success": true
}
```

#### 5. Remove Video from Playlist

```bash
POST api/v1/playlists/playlist/:playlistId/video/:videoId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cb4beb077b8d2358292e",
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos",
    "videos": [],
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T04:59:55.128Z",
    "updatedAt": "2025-09-03T05:05:21.324Z",
    "__v": 2
  },
  "message": "Video removed successfully from playlist",
  "success": true
}
```

#### 6. Delete Playlist

```bash
DELETE api/v1/playlists/playlist/:playlistId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cb4beb077b8d2358292e",
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos",
    "videos": [],
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T04:59:55.128Z",
    "updatedAt": "2025-09-03T05:05:21.324Z",
    "__v": 2
  },
  "message": "Playlist deleted successfully",
  "success": true
}
```

#### 7. Update Playlist

```bash
DELETE api/v1/playlists/playlist/:playlistId
```
##### 📸 Screenshot
![Update Playlist](./src/images/Update-Playlist.png)
```json
{
  "statusCode": 200,
  "data": {
    "_id": "686e1893d90af82940c0b959",
    "name": "Assassins Creed Valhalla",
    "description": "All Trailer Videos for Valhalla",
    "videos": ["686cbcb5a41b4cd3b89790ce"],
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-07-09T07:21:55.915Z",
    "updatedAt": "2025-09-03T05:07:09.832Z",
    "__v": 3
  },
  "message": "Playlist updated successfully",
  "success": true
}
```

### Dashboard Routes

#### 1. Get Channel Stats

```bash
GET api/v1/dashboard/channel-stats
```

```json
{
  "statusCode": 200,
  "data": {
    "videoCount": 2,
    "subscriberCount": 2,
    "totalVideoViews": 8,
    "totalCommentLikesCount": 0,
    "totalVideoLikesCount": 2,
    "totalTweetLikesCount": 2
  },
  "message": "Channel stats fetched successfully",
  "success": true
}
```

#### 2. Get Channel Videos

```bash
GET api/v1/dashboard/channel-videos
```

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "686cbc62a41b4cd3b89790c8",
      "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956576/qerouopvrnzphdpdyjgm.mp4",
      "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qerouopvrnzphdpdyjgm.jpg?_a=BAMAK+M20",
      "title": "Cyberpunk 2077 (1user1)",
      "description": "Live Wallpaper (1user1)",
      "views": 5,
      "duration": 30.033333,
      "isPublished": true,
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-07-08T06:36:18.087Z",
      "updatedAt": "2025-07-11T06:32:37.672Z",
      "__v": 0
    },
    {
      "_id": "686cbcb5a41b4cd3b89790ce",
      "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956660/tnlk6kclifcljafjvvls.mp4",
      "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/tnlk6kclifcljafjvvls.jpg?_a=BAMAK+M20",
      "title": "Cyberpunk 2077 (2user1)",
      "description": "Live Wallpaper (2user1)",
      "views": 3,
      "duration": 30.033333,
      "isPublished": true,
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-07-08T06:37:41.972Z",
      "updatedAt": "2025-07-11T06:19:39.784Z",
      "__v": 0
    }
  ],
  "message": "Videos fetched successfully",
  "success": true
}
```

### Subscriptions Routes

#### 1. Get Subscribers

```bash
GET api/v1/subscriptions/subscribers/:channelId
```

```json
{
  "statusCode": 200,
  "data": {
    "docs": [
      {
        "_id": "686e152007cf2c8627ed9184",
        "subscriber": {
          "_id": "686cad83a41b4cd3b897909f",
          "username": "user2",
          "email": "user2@test.com"
        }
      },
      {
        "_id": "686e15ad07cf2c8627ed91ac",
        "subscriber": {
          "_id": "686cad45a41b4cd3b897909b",
          "username": "user13",
          "email": "user13@test.com"
        }
      }
    ],
    "totalDocs": 2,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  },
  "message": "Subcriber list fetched successfully",
  "success": true
}
```

#### 2. Toggle Subscription

```bash
POST api/v1/subscriptions/:channelId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7ce1feb077b8d23582955",
    "subscriber": "686cad45a41b4cd3b897909b",
    "channel": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T05:11:59.855Z",
    "updatedAt": "2025-09-03T05:11:59.855Z",
    "__v": 0
  },
  "message": "Unsubscribed successfully",
  "success": true
}
```

#### 3. Get Subscribed Channels

```bash
GET api/v1/subscriptions/subscribed-channels/:subscriberId
```

```json
{
  "statusCode": 200,
  "data": {
    "docs": [
      {
        "_id": "686e14e807cf2c8627ed9166",
        "Subscribedchannel": {
          "_id": "686cad83a41b4cd3b897909f",
          "username": "user2",
          "email": "user2@test.com",
          "fullName": "User Two"
        }
      },
      {
        "_id": "686e14f507cf2c8627ed916b",
        "Subscribedchannel": {
          "_id": "686cad97a41b4cd3b89790a3",
          "username": "user3",
          "email": "user3@test.com",
          "fullName": "User Three"
        }
      },
      {
        "_id": "686e14fe07cf2c8627ed9170",
        "Subscribedchannel": {
          "_id": "686cada8a41b4cd3b89790a7",
          "username": "user4",
          "email": "user4@test.com",
          "fullName": "User Four"
        }
      },
      {
        "_id": "686f652f50f2752b0a4f320f",
        "Subscribedchannel": {
          "_id": "686cadb7a41b4cd3b89790ab",
          "username": "user5",
          "email": "user5@test.com",
          "fullName": "User Five"
        }
      }
    ],
    "totalDocs": 4,
    "limit": 10,
    "page": 1,
    "totalPages": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  },
  "message": "Subscribed channel list fetched successfully",
  "success": true
}
```

### Tweets Routes

#### 1. Create Tweet

```bash
POST api/v1/tweets
```
##### 📸 Screenshot
![Create Tweet](./src/images/Create-Tweet.png)
```json
{
  "statusCode": 201,
  "data": {
    "content": "Tweet 3User1",
    "owner": "686cad45a41b4cd3b897909b",
    "_id": "68b7cef7eb077b8d2358295f",
    "createdAt": "2025-09-03T05:15:35.876Z",
    "updatedAt": "2025-09-03T05:15:35.876Z",
    "__v": 0
  },
  "message": "Tweet created successfully",
  "success": true
}
```

#### 2. Get User Tweets

```bash
GET api/v1/tweets/:userId
```

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "686e130f07cf2c8627ed908f",
      "content": "Tweet 1User1",
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-07-09T06:58:23.337Z",
      "updatedAt": "2025-07-09T06:58:23.337Z",
      "__v": 0
    },
    {
      "_id": "686e131807cf2c8627ed9092",
      "content": "Tweet 2User1",
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-07-09T06:58:32.500Z",
      "updatedAt": "2025-07-09T06:58:32.500Z",
      "__v": 0
    },
    {
      "_id": "68b7cef7eb077b8d2358295f",
      "content": "Tweet 3User1",
      "owner": "686cad45a41b4cd3b897909b",
      "createdAt": "2025-09-03T05:15:35.876Z",
      "updatedAt": "2025-09-03T05:15:35.876Z",
      "__v": 0
    }
  ],
  "message": "Tweets found successfully",
  "success": true
}
```

#### 3. Update Tweet

```bash
PATCH api/v1/tweets/:tweetId
```
##### 📸 Screenshot
![Update Tweet](./src/images/Update-Tweet.png)
```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cef7eb077b8d2358295f",
    "content": "Updated Tweet",
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T05:15:35.876Z",
    "updatedAt": "2025-09-03T05:17:20.859Z",
    "__v": 0
  },
  "message": "Tweet updated successfully",
  "success": true
}
```

#### 4. Delete Tweet

```bash
DELETE api/v1/tweets/:tweetId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7cef7eb077b8d2358295f",
    "content": "Updated Tweet",
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T05:15:35.876Z",
    "updatedAt": "2025-09-03T05:17:20.859Z",
    "__v": 0
  },
  "message": "Tweet deleted successfully",
  "success": true
}
```

### Videos Routes

#### 1. Get All Videos

```bash
GET api/v1/videos?query=cyber
```
##### 📸 Screenshot
![Get All Videos](./src/images/Get-All-Videos.png)
```json
{
  "statusCode": 200,
  "data": {
    "docs": [
      {
        "_id": "686cbc62a41b4cd3b89790c8",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956576/qerouopvrnzphdpdyjgm.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qerouopvrnzphdpdyjgm.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user1)",
        "description": "Live Wallpaper (1user1)",
        "views": 5,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cad45a41b4cd3b897909b",
        "createdAt": "2025-07-08T06:36:18.087Z",
        "updatedAt": "2025-07-11T06:32:37.672Z",
        "__v": 0
      },
      {
        "_id": "686cbf35a41b4cd3b8979137",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957300/j97t4euclrhh0tyrqpfp.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/j97t4euclrhh0tyrqpfp.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user10)",
        "description": "Live Wallpaper (1user10)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cae20a41b4cd3b89790bf",
        "createdAt": "2025-07-08T06:48:21.630Z",
        "updatedAt": "2025-07-08T06:48:21.630Z",
        "__v": 0
      },
      {
        "_id": "686cbd11a41b4cd3b89790d7",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956750/oj8rsus4wppq4s9qythi.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/oj8rsus4wppq4s9qythi.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user2)",
        "description": "Live Wallpaper (1user2)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cad83a41b4cd3b897909f",
        "createdAt": "2025-07-08T06:39:13.074Z",
        "updatedAt": "2025-07-08T06:39:13.074Z",
        "__v": 0
      },
      {
        "_id": "686cbd51a41b4cd3b89790e3",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956815/qs07lapkywsdofdqwrxr.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qs07lapkywsdofdqwrxr.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user3)",
        "description": "Live Wallpaper (1user3)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cad97a41b4cd3b89790a3",
        "createdAt": "2025-07-08T06:40:17.571Z",
        "updatedAt": "2025-07-08T06:40:17.571Z",
        "__v": 0
      },
      {
        "_id": "686cbd97a41b4cd3b89790ef",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956885/kwv5l2welugy3q9pzbfi.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/kwv5l2welugy3q9pzbfi.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user4)",
        "description": "Live Wallpaper (1user4)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cada8a41b4cd3b89790a7",
        "createdAt": "2025-07-08T06:41:27.363Z",
        "updatedAt": "2025-07-08T06:41:27.363Z",
        "__v": 0
      },
      {
        "_id": "686cbdcea41b4cd3b89790fb",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956941/vumlgai3yridin7vgl3k.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/vumlgai3yridin7vgl3k.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user5)",
        "description": "Live Wallpaper (1user5)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cadb7a41b4cd3b89790ab",
        "createdAt": "2025-07-08T06:42:22.806Z",
        "updatedAt": "2025-07-08T06:42:22.806Z",
        "__v": 0
      },
      {
        "_id": "686cbe2ca41b4cd3b8979107",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957034/bwpnkkceortlctfns1bx.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/bwpnkkceortlctfns1bx.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user6)",
        "description": "Live Wallpaper (1user6)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cadcaa41b4cd3b89790af",
        "createdAt": "2025-07-08T06:43:56.225Z",
        "updatedAt": "2025-07-08T06:43:56.225Z",
        "__v": 0
      },
      {
        "_id": "686cbe95a41b4cd3b8979113",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957139/xq2cszxubic5wizv06gk.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/xq2cszxubic5wizv06gk.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user7)",
        "description": "Live Wallpaper (1user7)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686caddaa41b4cd3b89790b3",
        "createdAt": "2025-07-08T06:45:41.097Z",
        "updatedAt": "2025-07-08T06:45:41.097Z",
        "__v": 0
      },
      {
        "_id": "686cbecda41b4cd3b897911f",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957195/bbkxalgm2rmwdyaetc4f.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/bbkxalgm2rmwdyaetc4f.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user8)",
        "description": "Live Wallpaper (1user8)",
        "views": 1,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cadeda41b4cd3b89790b7",
        "createdAt": "2025-07-08T06:46:37.029Z",
        "updatedAt": "2025-07-11T06:49:58.519Z",
        "__v": 0
      },
      {
        "_id": "686cbefea41b4cd3b897912b",
        "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957244/xzkbu0erht886wr092cu.mp4",
        "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/xzkbu0erht886wr092cu.jpg?_a=BAMAK+M20",
        "title": "Cyberpunk 2077 (1user9)",
        "description": "Live Wallpaper (1user9)",
        "views": 0,
        "duration": 30.033333,
        "isPublished": true,
        "owner": "686cadfea41b4cd3b89790bb",
        "createdAt": "2025-07-08T06:47:26.253Z",
        "updatedAt": "2025-07-08T06:47:26.253Z",
        "__v": 0
      }
    ],
    "totalDocs": 20,
    "limit": 10,
    "page": 1,
    "totalPages": 2,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
  },
  "message": "Videos fetched successfully",
  "success": true
}
```

#### 2. Publish Video

```bash
POST api/v1/videos/publish-video
```
##### 📸 Screenshot
![Publish Video](./src/images/Publish-Video.png)
```json
{
  "statusCode": 201,
  "data": {
    "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1756876939/yvrafuqhnhg3cxglfbhk.mp4",
    "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/yvrafuqhnhg3cxglfbhk.jpg?_a=BAMAK+M20",
    "title": "Dragon (user13)",
    "description": "Live Wallpaper (user13)",
    "views": 0,
    "duration": 25.101,
    "isPublished": true,
    "owner": "686cad45a41b4cd3b897909b",
    "_id": "68b7d08ceb077b8d23582972",
    "createdAt": "2025-09-03T05:22:20.798Z",
    "updatedAt": "2025-09-03T05:22:20.798Z",
    "__v": 0
  },
  "message": "Video created successfully",
  "success": true
}
```

### 3. Get Video By ID

```bash
GET api/v1/videos/:videoId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cbecda41b4cd3b897911f",
    "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751957195/bbkxalgm2rmwdyaetc4f.mp4",
    "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/bbkxalgm2rmwdyaetc4f.jpg?_a=BAMAK+M20",
    "title": "Cyberpunk 2077 (1user8)",
    "description": "Live Wallpaper (1user8)",
    "views": 3,
    "duration": 30.033333,
    "isPublished": true,
    "owner": "686cadeda41b4cd3b89790b7",
    "createdAt": "2025-07-08T06:46:37.029Z",
    "updatedAt": "2025-09-03T05:22:38.554Z",
    "__v": 0
  },
  "message": "Video fetched successfully and viewcount updated",
  "success": true
}
```

#### 4. Update Video

```bash
PATCH api/v1/videos/:videoId
```
##### 📸 Screenshot
![Update Video](./src/images/Update-Video.png)
```json
{
  "statusCode": 200,
  "data": {
    "_id": "68b7d08ceb077b8d23582972",
    "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1756876939/yvrafuqhnhg3cxglfbhk.mp4",
    "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/yvrafuqhnhg3cxglfbhk.jpg?_a=BAMAK+M20",
    "title": "Dragon1",
    "description": "Live Wallpaper1",
    "views": 0,
    "duration": 25.101,
    "isPublished": true,
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-09-03T05:22:20.798Z",
    "updatedAt": "2025-09-03T05:24:06.578Z",
    "__v": 0
  },
  "message": "Video details updated successfully",
  "success": true
}
```

#### 5. Delete Video

```bash
DELETE api/v1/videos/:videoId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cbc62a41b4cd3b89790c8",
    "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956576/qerouopvrnzphdpdyjgm.mp4",
    "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/qerouopvrnzphdpdyjgm.jpg?_a=BAMAK+M20",
    "title": "Dragon1",
    "description": "Live Wallpaper1",
    "views": 5,
    "duration": 30.033333,
    "isPublished": true,
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-07-08T06:36:18.087Z",
    "updatedAt": "2025-09-03T10:12:09.127Z",
    "__v": 0
  },
  "message": "Video deleted successfully",
  "success": true
}
```

#### 6. Toggle Video Publish Status

```bash
PATCH api/v1/videos/toggle-publish-status/:videoId
```

```json
{
  "statusCode": 200,
  "data": {
    "_id": "686cbcb5a41b4cd3b89790ce",
    "videoFile": "http://res.cloudinary.com/aaditya06/video/upload/v1751956660/tnlk6kclifcljafjvvls.mp4",
    "thumbnail": "https://res.cloudinary.com/aaditya06/video/upload/so_auto/tnlk6kclifcljafjvvls.jpg?_a=BAMAK+M20",
    "title": "Cyberpunk 2077 (2user1)",
    "description": "Live Wallpaper (2user1)",
    "views": 3,
    "duration": 30.033333,
    "isPublished": false,
    "owner": "686cad45a41b4cd3b897909b",
    "createdAt": "2025-07-08T06:37:41.972Z",
    "updatedAt": "2025-09-03T10:14:50.084Z",
    "__v": 0
  },
  "message": "Video publish status toggled successfully",
  "success": true
}
```

## Installation / Access

### 📦 On Local Machine

```bash
npm run dev
```

### 🌐 Using Vercel Link

https://password-generator-eta-cyan-16.vercel.app/
