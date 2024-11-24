for the task I used 3 main tools:
1) NextJs - the main framework in which the app will run in
2) Inngest - an event driven framework that will run the workflows, manage failures and auto retries.
3) Sanity - a cloud based cms where the user can create, store and modify workflows

please run the project with npm run dev. it uses concurrent to:
1) start the next dev server - https://localhost:3000
2) start Inngest dashboard where you can monitor the workflow runs - http://localhost:8288/stream
3) start sanity studio where you can view/create/modify the workflows

At the main page (https://localhost:3000), select a workflow and click the button to run it

