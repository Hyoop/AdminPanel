# A lighter version of Node
FROM mhart/alpine-node:14

# Set the working directory to /adminpanel
WORKDIR /adminpanel

#Copy the current directory contents into the container at /adminpanel
COPY . /adminpanel/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
