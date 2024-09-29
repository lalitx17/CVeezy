## Inspiration 
We have experienced the difficulty of applying to hundreds of jobs, each requiring concentrated effort for little to no reward. **We designed this software to make the tedious task of writing cover letters, essays, and emails much faster and easier.** 

## What it does 
**CVessy simplifies the job application process by allowing users to:**
- **Search for job listings.**
- **Automatically generate tailored CVs.**
- **Manage their job application content efficiently.**

Users can enter job details manually or search for jobs directly from the platform, saving time and ensuring that their applications are well-crafted. 

## How we built it 
We built CVessy using **React** for the front-end, leveraging state management hooks to handle user interactions and application state. The backend is powered by an **API** that connects to a job database, perplexity AI, and vectorized user data stored on mongodb, allowing us to gather all relevant information for a job listing and candidate. For CV generation, perplexity generates a letter with the provided context, then we convert it to a PDF.

## Challenges we ran into
- Designing an intuitive UI that caters to users with varying levels of technical expertise.
- Learning and debugging mongodb's new embedding feature
- Handling asynchronous data fetching
- Managing authentication across four separate platforms

## Accomplishments
We are proud of creating a fully functional application that allows users to:
- **Search for jobs.**
- **Generate cover letters with minimal effort.**
- **Write compelling custom made essays almost instantly**

## What we learned 
Throughout the development process, we gained valuable insights into:
- **User-centered design principles.**
- The importance of maintaining **clean, maintainable code.**
- Effectively managing state in a **React application.**
- The significance of optimizing API calls for better performance.
- Separate express.js into many file, to stay organized

Additionally, we improved our **collaboration skills** and learned to work efficiently as a team. 
