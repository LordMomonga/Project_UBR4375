document.addEventListener('DOMContentLoaded', () => {
    const footerContent = document.getElementById('footer-content');
    
    // Structure des sections
    const sections = [
        {
            title: "_UBR 4375",
            description: "Empowering developers to create amazing projects with modern technologies.",
            icon: "https://img.icons8.com/ios-filled/50/ffffff/code.png",  // Code icon
        },
        {
            title: "Product",
            links: ["Features", "Pricing", "Documentation", "API"],
        },
        {
            title: "Company",
            links: ["About", "Blog", "Careers", "Contact"],
        },
        {
            title: "Support",
            links: ["Help Center", "Community", "Status", "Updates"],
        },
    ];

    // Ajouter chaque section au footer
    sections.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('space-y-4');
        
        if (section.title === "M_World") {
            // Si la section est "M_World", ajouter l'icône et la description
            sectionDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <img src="${section.icon}" alt="Code Icon" class="w-5 h-5 text-white">
                    </div>
                    <span class="text-xl font-bold">${section.title}</span>
                </div>
                <p class="text-slate-400 text-sm">${section.description}</p>
            `;
        } else {
            // Si la section a des liens, générer les liens
            sectionDiv.innerHTML = `
                <h4 class="font-semibold">${section.title}</h4>
                <ul class="space-y-2">
                    ${section.links.map(link => `<li><a href="#" class="text-slate-400 hover:text-white transition-colors text-sm">${link}</a></li>`).join('')}
                </ul>
            `;
        }

        // Ajouter la section au conteneur principal
        footerContent.appendChild(sectionDiv);
    });
});
