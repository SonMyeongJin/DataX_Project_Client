## [Read.me [Japanese .ver]](https://sonmyeongjin.github.io/posts/client-readme-_-JPN/)

## [Read.me [Korean .ver]](https://sonmyeongjin.github.io/posts/client-readme-_-kor/)

# -- Cors Error Unresolved --
The server still has not resolved the Cors error, so access is only available from browsers that do not enforce Cors checks.

[How to Disable CORS in Safari Developer Mode]
1. Open Safari
2. Enable "Developer Mode"
    * Go to Safari → Preferences → Advanced
    * Check "Show Develop menu in menu bar"
3. Disable CORS in the Developer menu
    * In the menu bar, click "Develop → Disable Cross-Origin Restrictions"

# Project Overview
This project is a blog platform implemented using Ruby on Rails and Vue.js. It includes features such as user authentication, article management, and search filtering.

[Server Github](https://github.com/SonMyeongJin/DataX_Project_Server-)

[Deployed]
http://54.180.239.200

## Development Environment
- Development Environment: macOS
- Node.js: 23.9.0
- Vue.js: 3.5.13
- Deployment: AWS EC2, Nginx

# Project Setup Steps

- Development Flow
    1. Configure Axios to use JWT tokens
    2. Implement login page
    3. Implement registration page
    4. Implement post creation and detail page
    5. Add filtering functionality using categories and search
    6. Implement post deletion and editing (only available to the author)
    7. Implement post navigation using tags
    8. Refine UI
    9. Deploy via AWS and Nginx
    10. Connect with the Rails server

# Implemented Features

- Login & Logout State
    - The displayed screens change based on the login/logout state.
    - The Post List is visible even when logged out, but the post creation page is accessible only when logged in (token verification required).

- Edit & Delete Buttons Available Only to the Author
    - The edit and delete buttons are displayed only if the logged-in user’s user_id matches the post author’s user_id.
    - ![](/ReadmeSrc/datax_post.jpeg)

- Search Functionality Using Category and Search Box
    - Selecting a category on the Post List page filters posts by that category.
    - The search box filters posts that contain the searched keyword in the title or content.

- Tag Functionality
    - Clicking on a tag in the Post Detail page displays other posts with the same tag.
    - When creating a post, tags are sent to the server as an array, separated by commas.
      Example: Tag1,Tag2 -> ["Tag1", "Tag2"]

- Mobile Version UI
    - When the screen width is 768px or less, the menu bar adapts to a mobile-friendly design.
    - ![](/ReadmeSrc/datax_mobile.gif)
