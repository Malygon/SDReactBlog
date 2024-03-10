# Thumbnail / Filter project in React
## Abstract 
The goal of this project was creating a photo slideshow with filters in react. This was done in the form of a Stable Diffusion blog. The pictures and filters are loaded dynamically based on JSON files. Thumbnails are generated based on the input images.
## Features
### Dynamic Pictures
The file **imgData.json** describes the blog entries. There are two types of entries: **single**, which only show a single picture and **comparison**, which compares 2 or more pictures. Further data included: the title of the entry, an abstract, a comment and the images.
Image data includes: an image title, the prompt, negative prompt, and generation info used to generate the image with Stable diffusion, as well as the name of the image. 
This data is used to generate the blog entries as well as the thumbnail bar.
### Dynamic Filters
The file **filters.json** describes the filters available. Each entry automatically gets added to the filter list as a button. The filters are applied prior to exporting the image, so the shown image already has the filter applied. If you download an image, it will have the selected filter.
### Thumbnail Bar
The Thumbnail bar is generated dynamically based on the image data. Comparison thumbnails, called collages, are drawn based on all images inside a comparison, with wrapping. The thumbnail bar also advances images based on a timer and can be paused.
### React Media Queries
Media queries implemented inside react can alter component behavior when triggered. When switching to a small screen, the preview and detail images are rendered smaller, to preserve device memory, while the thumbnail bar also only shows 1 image to each side, instead of 2.
## Conclusion
This was a fun little project for learning react, dynamic content generation, as well as media queries inside react.
