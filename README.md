1. Within a GitHub action that runs whenever code is pushed.  
   This is the best option in my opinion because it promotes the idea of Continous Integration (CI) as it can give us quick feedback if it fails any tests we have defined and also if it is following the development practices we have defined for the team. The problem with the second option in my opinion is that a lot of times, we face the problem of "it works on my machine" which is not ideal for deployement and stability. The third option is not the best one either because running tests after everything has been put together can be fatal because if something goes wrong, we will have to strip everything down to fix it again which can be very time-consuming and unnecessary which reminds of the class concept of Technical Debt.   

2. No, I think that if E2E testing is being used just to test the correct output then it is probably not the best way to do it because E2E is meant for comprehensive testing of the entire workflow and interaction of elements with each other. If we want to just the test the output, I think a unit test is a much simpler and faster way to do it.    
   
3. The navigation mode shows that the web page does very well acorss 4 categories of performance, accessibility, best practices, and SEO with the lowest score being 90 among all 4. For snapshot mode, the page did comparatively worse as it did poorly on performace, decent for best practices and seo and good for accessibility which is very different from the snapshot mode.  

   Navigation mode shows that html elements does not have the lang attribute and both modes show that the <meta name="viewport"> tag is missing. Both also point out that the document does not have a meta description. Snapshot mode also otulines that the images were larger than their displayed size which could be a performance issue. 


   The key difference between the 2 modes is that navigation mode is for when a page is loaded from scratch and is best used to test performace while snapshot mode analyzes the page from the state it is when the test is run and is best used to test the accessibility aspect. 


4. A) Properly size images and serve them in formats such as WebP and AVIF as they provide better compression than PNG and JPEG.   
   B) We should preload the Largest Contentful Paint (LCP) image if the LCP element is dynamically added to the page to improve performance.  
   C) We should also have a longer cache lifetime as that can speed up repeat visits to the page and will better serve static assets.




