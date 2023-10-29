
# Billplz Assignment

Create a responsive merchant dashboard with analytics charts simulation and use a mock data API.

## Information
**Mockup API Configuration:**
I've configured my mockup API using Next.js. In this setup, I've introduced mock data and set it as the response for the API. The mock data resides in the 'src/data' directory, while the API logic is located in 'src/pages/api'.

**Data Retrieval Services:**
To streamline data retrieval from the API, I've introduced a 'services' folder in 'src'. This folder contains functions and modules dedicated to fetching and handling data.

**Screen Components:**
For better code maintenance, I've adopted a modular approach to screen components. This involves creating various reusable components like layouts, sidebars, navbar, cards, modal, and more. These components are organized within the 'src/components' directory, making it easy to manage and maintain the codebase.

**Chart Integration:**
For charting capabilities, I'm incorporating two libraries: https://www.tremor.so/ and https://www.react-google-charts.com/. These libraries enhance data visualization and are seamlessly integrated into the project.




## Live Preview

Link: https://billplz-analytics.vercel.app/

![App Screenshot](https://i.ibb.co/swJyQyZ/Screenshot-2023-10-28-at-4-06-59-PM.png)


## Tech Stack

**Client:** Next.js, Tailwindcsss, Typescript

## Run Locally

create .env.local file
```bash
  NEXT_PUBLIC_MOCKUP_API_URL="http://localhost:3000/api"
```

Start the server
```bash
  npm run dev
```






