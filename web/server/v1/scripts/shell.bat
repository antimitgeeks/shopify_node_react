!/bin/bash

echo "vaibhav"
red=$(tput setaf 1)
green=$(tput setaf 2)
blue=$(tput setaf 6)
yellow=$(tput setaf 3)
reset=$(tput sgr0)

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "${blue}Usage: $0 <project_id> <package_name>${reset}"
    exit 1
fi

# Assign arguments to variables
PROJECT_ID="$1"
PACKAGE_NAME="$2"

# Validate package name format for Android (basic check)
if [[ ! "$PACKAGE_NAME" =~ ^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+ ]]; then
    echo "${red}Invalid package name format: '$PACKAGE_NAME'. Package name should be in the format 'com.example.app'${reset}"
    exit 1
fi

# Firebase Logout
firebase logout

# Authenticate Firebase CLI
(echo Y & echo) | firebase login --interactive

# Initialize Firebase Remote Config for the project (if not initialized)
echo -e "y\n" | firebase init remoteconfig --project="$PROJECT_ID"

# Create Firebase project if it doesn't exist
if firebase projects:create --display-name "$PROJECT_ID" "$PROJECT_ID"; then
    echo "${green}Success! Firebase project created.${reset}"
else
    echo "${red}Failed to create project ($PROJECT_ID).${reset}"
    # echo "${red}Exiting...${reset}"
    # exit 1
fi

# Wait for the Firebase project list to update
echo "${yellow}Waiting for Firebase to update project list...${reset}"
sleep 10  # Allow time for Firebase to sync the newly created project
  echo "${blue}Creating Project${reset}"
sleep 5s
  echo "${blue}.${reset}"
sleep 5s
  echo "${blue}.${reset}"
sleep 5s
  echo "${blue}.${reset}"
sleep 5s

# Check if the project already exists in Firebase projects list
project_check=$(firebase projects:list | grep "$PROJECT_ID")
if [ -n "$project_check" ]; then
    echo "${yellow}Using project '$PROJECT_ID'${reset}"
else
    echo "${red}Project with ID '$PROJECT_ID' does not exist.${reset}"
    echo "${red}Exiting...${reset}"
    exit 1
fi

# List Firebase projects for confirmation
firebase projects:list

# Create Firebase Android app
firebase apps:create ANDROID "$PACKAGE_NAME" --project="$PROJECT_ID"
if [ $? -eq 0 ]; then
    echo "${green}Android app created successfully with package name: $PACKAGE_NAME${reset}"
else
    echo "${red}Failed to create Android app${reset}"
    exit 1
fi

# Create Firebase iOS app
firebase apps:create IOS "$PACKAGE_NAME" --project="$PROJECT_ID"
if [ $? -eq 0 ]; then
    echo "${green}iOS app created successfully with package name: $PACKAGE_NAME${reset}"
else
    echo "${red}Failed to create iOS app${reset}"
    exit 1
fi

# Configure Firebase for Flutter project
dart pub global activate flutterfire_cli
flutterfire configure --project="$PROJECT_ID" --platforms=android,ios
if [ $? -eq 0 ]; then
    echo "${green}Firebase project setup successfully for Android and iOS!${reset}"
else
    echo "${red}Flutterfire configuration failed.${reset}"
    exit 1
fi

# Firebase Logout
firebase logout
