 URL Shortener (MERN Stack)

Hey everyone,  
This is a minimal, full-stack URL Shortener app built using the MERN stack. Users can shorten long URLs, create custom short links, and manage them in a clean dashboard. It supports login/signup, redirection, and has a fully responsive UI.

 Features

- Shorten any long URL using Nano ID  
- Create custom short links like `short.ly/my-link`  
- Automatically redirect to original URLs  
- User login and signup with JWT-based authentication  
- Manage all URLs from a personal dashboard  
- Responsive UI built with React and Tailwind CSS  
- Passwords are securely hashed using bcrypt  
- Clean folder structure for scalability and production

 Screenshots

UI Preview of the Application
<img width="1345" height="629" alt="Screenshot 2025-07-19 221137" src="https://github.com/user-attachments/assets/38964941-0e61-49c8-9cff-2d57c7a4bd44" />
<img width="1357" height="622" alt="Screenshot 2025-07-19 221013" src="https://github.com/user-attachments/assets/14db60ce-3c82-4a93-acd1-707b0916d02e" />
<img width="1344" height="627" alt="Screenshot 2025-07-19 221149" src="https://github.com/user-attachments/assets/4fbe815b-63ff-4400-80eb-2f141a8bb7ae" />

 Tech Stack

 Frontend

- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

 Backend
- Node.js + Express.js
- MongoDB + Mongoose

- JWT for auth
- Bcrypt for password hashing

- Nano ID for short URLs

 Folder Structure

url-shortener/
├── BACKEND/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routing/     
│   │   ├── store/        
│   │   ├── apis/
│   │   └── main.jsx
│   └── tailwind.config.js
