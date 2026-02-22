import img1 from '../assets/news/earthquake.jpg';
import img2 from '../assets/news/flood.jpg';
import img3 from '../assets/news/news1.jpg';
import img4 from '../assets/news/news2.jpg';

// Mock Data for News/Activities
const newsData = [
    {
        id: 1,
        title: "Distribution of Winter Kits in Refugee Camps",
        date: "2023-11-15",
        summary: "UMCA teams have successfully distributed over 5000 winter kits containing blankets, coats, and heaters to families in need.",
        image: img1,
        category: "Relief"
    },
    {
        id: 2,
        title: "New School Opening in Remote Village",
        date: "2023-10-22",
        summary: "A new primary school built by UMCA will provide education to 300 children who previously had no access to schooling.",
        image: img2,
        category: "Education"
    },
    {
        id: 3,
        title: "Medical Camp Serves Thousands",
        date: "2023-09-05",
        summary: "Our recent 3-day medical camp provided free checkups and medicine to over 2000 patients.",
        image: img3,
        category: "Health"
    },
    {
        id: 4,
        title: "Clean Water Project Completed",
        date: "2023-08-12",
        summary: "Residents of [Village Name] now have access to clean, potable water thanks to the new solar-powered well.",
        image: img4,
        category: "Water"
    }
];

export const fetchNews = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(newsData);
        }, 500); // Simulate network delay
    });
};
