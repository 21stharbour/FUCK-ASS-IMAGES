var Cimg = document.getElementById("current-image");
var imgChoices = document.getElementById("imgchoicesamp");


for (var i = 1; i <= 12; i++) {
    var letter = String.fromCharCode(64 + i);
    var thumb = document.createElement("img");
    thumb.src = "img/choiceimg/choiceimg" + letter + ".jpg";
    thumb.alt = "Choice Image " + letter;
    thumb.classList.add("thumb");
    imgChoices.appendChild(thumb);
    thumb.addEventListener(
        "click", function() {
            Cimg.src = this.src;
        }
    )
}

// Fetch ONCE and process all categories
fetch('data/filelist.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    Object.keys(data).forEach(category => {
      const container = document.getElementById(category);
      if (!container) {
        console.warn(`Missing container for: ${category}`);
        return;
      }
      
      const imageContainer = container.querySelector('.category-images');
      if (!imageContainer) return;
      
      // Clear previous content
      imageContainer.innerHTML = '';
      
      data[category].forEach(file => {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("image-wrapper");
        
        const img = document.createElement("img");
        img.src = `img/${category}/${file}`;
        img.alt = file.split('.')[0]; // Use filename as alt text
        img.classList.add("category-images-img");
        
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download-button';
        downloadButton.onclick = (e) => {
          e.stopPropagation();
          const a = document.createElement('a');
          a.href = img.src;
          a.download = file;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
        
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(downloadButton);
        imageContainer.appendChild(imgWrapper);
      });
    });
  })
  .catch(err => {
    console.error("Gallery loading failed:", err);
    // Show error to users
    document.body.innerHTML += `
      <div style="color:red; padding:20px; background:#ffecec;">
        Failed to load gallery. Refresh or check console (F12) for details.
      </div>
    `;
  });



window.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100); // slight delay to ensure images are loaded
        }
    }
});


/* script for stuff.html */
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll(".downloadbutton");
    
    downloadButtons.forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            const a = document.createElement('a');
            a.href = "img/fall.jpg";
            a.download = "fall.jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    });
});
