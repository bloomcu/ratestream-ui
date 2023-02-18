# RateStream Frontend

The frontend for ratestream.io app.

## Install Locally

**Step 1:** Clone this repository

```
git clone https://github.com/bloomcu/ratestream-ui.git
```

<br>

**Step 2:** Change directory into application

```
cd ratestream-ui
```

<br>

**Step 3:** Install dependencies

```
npm install
```

<br>

**Step 4:** Copy **env.sample** and create a **.env** file with:
> Get missing env values from Ryan Harmon
```
VITE_API_BASE_URL=
VITE_REDIRECT_FROM_ORGANIZATIONS_ROUTE=rates
VITE_PUSHER_APP_KEY=
VITE_PUSHER_APP_CLUSTER=
VITE_PUSHER_APP_AUTH_ENDPOINT=
VITE_STRIPE_KEY=
```

<br>

**Step 5:** Compile

```
npm run dev
```
