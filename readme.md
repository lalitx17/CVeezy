## Inspiration 
We have experienced the difficulty of applying to hundreds of jobs, each requiring concentrated effort for little to no reward. **We designed this software to make the tedious task of writing cover letters, essays, and emails much faster and easier.** 

## What it does 
**CVessy simplifies the job application process by allowing users to:**
- **Search for job listings.**
- **Automatically generate tailored CVs.**
- **Manage their job application content efficiently.**

Users can enter job details manually or search for jobs directly from the platform, saving time and ensuring that their applications are well-crafted. 

## How we built it 
We built CVessy using **React** for the front-end, leveraging state management hooks to handle user interactions and application state. The backend is powered by an **API** that connects to a job database, perplexity AI, and vectorized user data stored on mongodb, allowing us to gather all relevant information for a job listing and candidate. For CV generation, perplexity generates a letter with the provided context, the we convert it to a PDF.

## Challenges we ran into
One of the main challenges was ensuring the application effectively handled **asynchronous data fetching** while maintaining a smooth user experience. We also faced difficulties in:
- Designing an intuitive UI that caters to users with varying levels of technical expertise.
- Learning and debugging mongodb's new embedding feature

## Accomplishments
We are proud of creating a fully functional application that allows users to:
- **Search for jobs.**
- **View detailed listings.**
- **Generate CVs with minimal effort.**

The user interface is both intuitive and responsive, providing a seamless experience across devices. Successfully implementing the **modal component** for job details significantly enhanced the user experience.

## What we learned 
Throughout the development process, we gained valuable insights into:
- **User-centered design principles.**
- The importance of maintaining **clean, maintainable code.**
- Effectively managing state in a **React application.**
- The significance of optimizing API calls for better performance.

Additionally, we improved our **collaboration skills** and learned to work efficiently as a team. 

## What's next for CVessy 
In the future, we plan to enhance CVessy by incorporating additional features such as:
- **Personalized job recommendations** based on user profiles.
- **Integration with LinkedIn** for easier job application processes.
- An **analytics dashboard** that tracks user application success.

We also aim to expand our job listing sources and refine the CV generation process to include various templates and styles.
