# Ape only your chains

`yarn && yarn dev`

## Testing with Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
#(add installed .foundry folder to path somehow)
foundryup
sudo rm /usr/local/bin/chisel
sudo mv /usr/local/bin/.foundry/bin/\* /usr/local/bin/
source ~/.bashrc
```

* Deploy the test contract

## Updating the prisma schema

`yarn prisma db push`

## API Routes

/post/<id> will bring up a specific item and all the user's posts.

```json
[
  User {
  id: '1',
  role: 'CREATOR',
  image: null,
  displayName: null,
  bio: null,
  addressETH: null,
  addressBTC: null,
  gender: null,
  createdAt: 2023-06-17T20:52:26.558Z,
  language: 'en',
  posts: [{
    id: 1,
    authorId: '1',
    title: 'ti',
    content: 'on here',
    contentPreview: 'on...',
    imagePreview: null,
    postedDate: 2023-06-17T20:55:04.917Z,
    images: [],
    imageAuthor: null,
    authorName: null,
    votes_up: null,
    votes_down: null,
    updatedAt: null
  }]
  }
]
```

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## ipfs config

```
...
"API": {
    "HTTPHeaders": {
      "Access-Control-Allow-Methods": [
        "PUT",
        "POST"
      ],
      "Access-Control-Allow-Origin": [
        "https://dev.webui.ipfs.io",
        "http://localhost:3000",
        "http://127.0.0.1:5001",
        "https://webui.ipfs.io"
      ]
    }
  },
...
"Gateway": {
    "APICommands": [],
    "HTTPHeaders": {
      "Access-Control-Allow-Headers": [
        "X-Requested-With",
      	"Access-Control\-Expose\-Headers",
        "Range",
        "User-Agent"
      ],
      "Access-Control-Allow-Methods": [
 	"POST",
        "GET"
      ],
      "Access-Control-Allow-Origin": [
        "*"
      ]
    },
    "NoDNSLink": false,
    "NoFetch": false,
    "PathPrefixes": [],
    "PublicGateways": null,
    "RootRedirect": ""
  },
```

### ipfs setup

run `ipfs daemon` after/before `npm run dev`
dont forget uploadthing api key (for now)

Creator page for each person
Card to unlock a photo/subscribe to individual

## Boris

1. Read posts
2. Write post
3. Edit post
4. Delete post

Fill out a form to make post
We make call to db to create user
We will only send it when use is signed in with wallet
view subscriptions if logged in and authenticated
*news page
*top creators list
*feed of all latest posts

Take your time do it slow


## TODO

404 page for posts
404 page for users