# fwrd.lol 🔗

An open-source URL shortener, QR code generator, and link-in-bio service. Built with Next.js, Tailwind CSS, and Prisma.

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/drgatooo/fwrd.lol.git
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the environment variables:

Rename the `.env.example` file to `.env` and fill in the required environment variables. Here is a guide to the environment variables:

#### 📂 Database

By default, the application uses MongoDB, and Prisma as the ORM. You can change the database to any other supported by Prisma.

```prisma
datasource db {
    provider = "mongodb" // Change this to your preferred database
    url      = env("DATABASE_URL")
}
```

Update the `DATABASE_URL` `.env` variable with your database connection string.

#### 🔑 Google OAuth

- Create a new project in the [Google API Console](https://console.developers.google.com/).

- Set up OAuth consent screen.

- Create new OAuth client ID credentials, and choose Web application as the application type.

- In Authorized redirect URIs, add `(your url(s) with http(s))/api/auth/callback/google`.

- Copy the client ID and client secret to the `.env` file.

#### 🔒 NextAuth

To create a good value for the `NEXTAUTH_SECRET`, run the following command:

```bash
openssl rand -base64 32
```

In `NEXTAUTH_URL`, set the URL of your application (or localhost if you're on development).

```properties
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

#### 📷 ImgBB API key

- Create an account on [ImgBB](https://imgbb.com/).

- Go to the [API](https://api.imgbb.com/) section and copy the API v1 key.

- Set the `IMGBB_KEY` in the `.env` file.

#### 🔮 Admin Key

Set a custom `ADMIN_KEY` in the `.env` file. This key is used to make POST requests to set Premium users.

#### 🔧 KV Store

- Go to [Vercel](https://vercel.com/), then to your Storage tab.

- Click on KV Durable Redis, then set up all things.

- Copy all the variables in `.env.local` tab to your `.env` file.

- If you will upload the project to Vercel, you don't need to set the KV variable in production, just configure it in the Vercel dashboard.

4. Generate Prisma database

```bash
npx|yarn|pnpm prisma generate
```

6. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing 🤝

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
