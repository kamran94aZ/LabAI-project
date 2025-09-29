document.addEventListener("DOMContentLoaded", function() {
  const departmentNames = ["Service Department", "Chef Department", "Asistant Department", "Design Department"];

  const explorerMenu = [
    "National Cuisine", "Eastern Cuisine", "European Cuisine",
    "American Cuisine", "Turkish Cuisine", "Indian Cuisine",
    "Australian Cuisine", "Georgian Cuisine"
  ];

  const deptColors = ["#4F46E5","#10B981","#F59E0B","#EF4444","#3B82F6","#6366F1","#14B8A6","#8B5CF6","#F97316","#0EA5E9"];

  const sampleFoods = ["Pizza","American Salad","Burger","Somon Fish","Russion Salad","Kebab","Turkish Pide","Khangal","Ravioli","Italian Macaroni Salad","Risotto","Turkish Macaroni","Adana Kebab","Pirzola","Scaloppine","Turkish Durum","Turkish Doner","Iskandar Doner","Ribollita"];
  const sampleDeserts = ["Cake","Baklava","Pudding","Brownie","Turkish Baklava","Cheesecake","Kunefe","Shakarbura","Sutlach","Ice Cream","Cinnabon Mini Swirls","Triple Chocolate Meltdown","Brownie Bite","Sizzlin Butter Pecan Blondie"];
  const sampleFishes = ["Salmon","Tuna","Trout","Carp","Sardine","Fischbrötchen","Fish and chips","Fish ball","Fish boil"];
  const sampleIceCream = ["Vanilla","Chocolate","Strawberry","Mango","Pistachio"];
  const sampleToys = ["Lego","Puzzle","Teddy Bear","RC Car","Doll","Action Figure"];

  const allDocs = [];
  for(let i=0;i<20;i++){
    allDocs.push({
      foods: sampleFoods[i % sampleFoods.length],
      deserts: sampleDeserts[i % sampleDeserts.length],
      fishes: sampleFishes[i % sampleFishes.length],
      iceCream: sampleIceCream[i % sampleIceCream.length],
      toys: sampleToys[i % sampleToys.length],
      category: departmentNames[i % departmentNames.length],
      cuisine: explorerMenu[i % explorerMenu.length], 
      color: deptColors[i % deptColors.length]
    });
  }

  const docList = document.getElementById("docList");

  function renderTable(data){
    docList.innerHTML = "";
    data.forEach(item=>{
      const tr = document.createElement("tr");
      tr.dataset.category = item.category;
      tr.dataset.cuisine = item.cuisine; 
      tr.dataset.color = item.color;
      tr.innerHTML = `<td>${item.foods}</td><td>${item.deserts}</td><td>${item.fishes}</td><td>${item.iceCream}</td><td>${item.toys}</td>`;
      docList.appendChild(tr);
    });
  }

  renderTable(allDocs);

  
  const deptArea = document.getElementById("deptArea");
  departmentNames.forEach((dept,index)=>{
    const div = document.createElement("div");
    div.className="department-item";
    div.textContent=dept;

    div.addEventListener("mouseenter",()=>highlightRows(dept,deptColors[index % deptColors.length]));
    div.addEventListener("mouseleave",clearHighlights);
    div.addEventListener("click",()=>{
      filterTableByCategory(dept);
      highlightRows(dept,deptColors[index % deptColors.length]);
    });
    deptArea.appendChild(div);
  });

  
  const explorerMenuDiv = document.getElementById("explorerMenu");
  explorerMenu.forEach(item=>{
    const a=document.createElement("a");
    a.href="#";
    a.textContent=item;
    a.addEventListener("click", e=>{
      e.preventDefault();
      filterTableByCuisine(item);
    });
    explorerMenuDiv.appendChild(a);
  });

  function filterTableByCuisine(cuisine){
    document.querySelectorAll("#docList tr").forEach(tr=>{
      tr.style.display=(tr.dataset.cuisine===cuisine)?"":"none";
    });
  }

  function highlightRows(category,color){
    document.querySelectorAll("#docList tr").forEach(tr=>{
      tr.style.backgroundColor="";
      tr.style.color="";
      if(tr.dataset.category===category){
        tr.style.backgroundColor=color;
        tr.style.color="#fff";
      }
    });
  }

  function clearHighlights(){
    document.querySelectorAll("#docList tr").forEach(tr=>{
      tr.style.backgroundColor="";
      tr.style.color="";
    });
  }

  function filterTableByCategory(category){
    document.querySelectorAll("#docList tr").forEach(tr=>{
      tr.style.display=(tr.dataset.category===category)?"":"none";
    });
  }

  function addSearch(id,key){
    document.getElementById(id).addEventListener("keyup",e=>{
      const term=e.target.value.toLowerCase();
      document.querySelectorAll("#docList tr").forEach(tr=>{
        const text=tr.children[key].innerText.toLowerCase();
        tr.style.display=text.includes(term)?"":"none";
      });
    });
  }

  addSearch("searchFoods",0);
  addSearch("searchDeserts",1);
  addSearch("searchFishes",2);
  addSearch("searchIceCream",3);
  addSearch("searchToys",4);

  document.getElementById("showAllBtn").addEventListener("click",()=>renderTable(allDocs));
});
