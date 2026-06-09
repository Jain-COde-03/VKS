# VKS - Vegetable & Kitchen Supplies E-Commerce Platform

A full-stack e-commerce platform for fresh vegetables, fruits, and kitchen supplies with location-based delivery, real-time inventory, and seamless payment integration.

## 🎯 Project Overview

VKS is a modern, responsive web application that allows users to:
- Browse fresh vegetables and kitchen supplies by category
- Search products with filters and sorting
- Add items to cart and manage quantities
- Create wishlists and compare products
- Track delivery by location
- Secure checkout with Razorpay payment integration
- View order history and track status

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0
- **Styling**: Tailwind CSS 4.3 + PostCSS
- **Routing**: React Router DOM 7.15
- **HTTP Client**: Axios 1.16
- **UI Components**: Material-UI (MUI)
- **Icons**: React Icons
- **State**: React Context + Custom Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2
- **Database**: MongoDB 9.6 (Mongoose)
- **Authentication**: JWT + bcryptjs
- **File Storage**: Cloudinary
- **Payment**: Razorpay
- **Middleware**: CORS, Cookie Parser, Multer

## 📁 Project Structure

```
VKS/
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx
│   │   │   └── providers/
│   │   │       └── AppProvider.jsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── home/
│   │   │   ├── products/
│   │   │   ├── navigation/
│   │   │   ├── user/
│   │   │   └── location/
│   │   ├── shared/
│   │   │   └── ui/
│   │   ├── data/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB instance (local or cloud)
- Cloudinary account for image storage
- Razorpay account for payments

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
# Fill in your API configuration
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
# Fill in your environment variables
```

4. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_POSITIONSTACK_API_KEY=your_positionstack_key
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/vks
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
NODE_ENV=development
```

## 📦 Available Scripts

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Backend
```bash
npm start         # Start production server
npm run dev       # Start development server with nodemon
```

## 🔑 Key Features

✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
✅ **Location-Based Services** - Filter products by delivery area
✅ **Real-Time Updates** - Live inventory and cart synchronization
✅ **Secure Authentication** - JWT-based user authentication
✅ **Payment Integration** - Razorpay for secure transactions
✅ **Product Management** - Categories, filters, search, and sorting
✅ **User Dashboard** - Order history, wishlist, and profile management
✅ **Performance Optimized** - Code splitting and lazy loading

## 🐛 Known Issues & TODOs

- [ ] Complete checkout flow implementation
- [ ] Add comprehensive error boundaries
- [ ] Implement Advanced search with AI suggestions
- [ ] Add product reviews and ratings system
- [ ] Implement admin dashboard
- [ ] Add email notifications
- [ ] Multi-language support

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

## 👨‍💻 Developer

- **Name**: Jain-COde-03
- **Email**: jaindhairya002@gmail.com
- **GitHub**: https://github.com/Jain-COde-03/VKS

## 📞 Support

For issues and feature requests, please create an issue on GitHub.

---

**Last Updated**: June 2026
