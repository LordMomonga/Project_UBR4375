export const projects = [
    {
        name: "Mario Game",
        description: "A classic Mario game built with HTML, CSS, and JavaScript.",
        image: "marioworld.jpg",
        link: "./projects/mario.html",
        developer: "Kamisi Samuel",
        date: "2023-10-01",
        technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
        name: "Weather App",
        description: "A simple weather application that fetches data from a weather API.",
        image: "weather.jpg",
        link: "projects/weather.html"
    },
   
];

export function displayProjects(containerId) {
    const container = document.getElementById(containerId);
    
    // Ajouter chaque projet à la page
    projects.forEach(project => {
        // Créer un élément de carte pour chaque projet
        const projectCard = document.createElement("div");
        projectCard.classList.add("bg-gray-800", "p-6", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition");

        projectCard.innerHTML = `
            <h3 class="text-xl font-semibold mb-4">${project.name}</h3>
            <div class="portrait mb-4">
               
                <img src="${project.image}" alt="${project.name}" class="w-full h-48 object-cover rounded-lg">
            </div>
            <p class="text-left text-gray-400 mb-4">${project.description}</p>
            <p class="my-5 text-left">Made by: <span class="font-bold">${project.developer}</span></p>
            <div class="ecriture space-x-4">
                <a href="${project.link}" class="inline-block text-center bg-white text-black py-2 px-6 rounded-full hover:bg-gray-300 transition-all duration-300">Try it</a>
                <button class="inline-block text-center bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-500 transition-all duration-300">About</button>
            </div>
        `;
           container.appendChild(projectCard);
    });

    }