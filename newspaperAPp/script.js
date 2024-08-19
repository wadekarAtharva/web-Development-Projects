const apiKey='2f73019ce2cc4fa6893a2a5ff575f274'

const blogContainer=document.getElementById('block-container');

const searchField=document.getElementById('search-input')
const searchButton=document.getElementById("search-button")



async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const response =await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
        // console.log(data)
        
    } catch (error) {
        console.error("Error fetching random news",error)
        return [];
    }
}
async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response =await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
        // console.log(data)
        
    } catch (error) {
        console.error("Error fetching random news",error)
        return [];
    }

}
searchButton.addEventListener("click",async()=>{
    const query=searchField.value.trim()
    if (query!=="") {
        try {
            const articles=await fetchNewsQuery(query)
            displayBlogs(articles)
            
        } catch (error) {
            console.error("Error fetching newa by query",error)
        }
    }
})

function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article)=>{

        const blogCard=document.createElement('div')
        blogCard.classList.add("blog-card")

        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        
        const title=document.createElement("h2")
        const truncatedTitle=article.title.length>30 ?article.title.slice(0,30)+"....." :article.title
        title.textContent=truncatedTitle


        const description=document.createElement("p")
        const truncatedDescription=article.description.length>120 ? article.description.slice(0,120)+"....":article.description
        description.textContent=truncatedDescription

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogContainer.appendChild(blogCard)

    });
}

(async () => {
    try {
       const articles=await fetchRandomNews()
       displayBlogs(articles)
    } catch (error) {
        console.error("Error fetching random news")
    }
})();