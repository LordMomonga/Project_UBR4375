// membersModule.js

// Tableau d'objets pour les membres de la classe
export const members = [
    { name: "Kamisi Samuel", role: "Développeur Front-end", image: "member1.jpg" },

];

// Fonction pour afficher les membres dans le conteneur spécifié
export function displayMembers(containerId) {
    const container = document.getElementById(containerId);
    

    // Ajouter chaque membre à la page
    members.forEach(member => {
        // Créer un élément de carte pour chaque membre
        const memberCard = document.createElement("div");
        memberCard.classList.add("member", "bg-gray-800", "p-6", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition");

        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="w-32 h-32 rounded-full mx-auto mb-4">
            <h3 class="text-xl font-semibold text-center">${member.name}</h3>
            <p class="text-center text-gray-400">${member.role}</p>
        `;

        // Ajouter le membre au conteneur
        container.appendChild(memberCard);
    });
}
