# Setup diagram viewer with docker
1. Pull the image `docker pull plantuml/plantuml-server:jetty`

2. Run the image `docker run -d -p 8080:8080 plantuml/plantuml-server:jetty` 
you can check the diagram accessing to http://localhost:8080/

3. Stop the container after finishing `docker stop [CONT_ID]` CONT_ID should be something similar to ddebee69a8bc7d6dcc218440b0048efe5c2c8d09b54dc81db73f9c42f7b93dac

4. [OPTIONAL] If don't need the container anymore you can remove it with `docker rm [CONT_ID]`


## ON VS CODE:

1. Install the extension PlantUML

2. Go into its settings: under Render choose `PlantUMLServer` and under Server write `http://localhost:8080`

3. To render the diagram, open the file and click alt+D (opt+D on macos) 

