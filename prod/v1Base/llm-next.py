#IMPORTS
import os
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

#APP CONFIG
key = input("Enter GP4 KEY: ")
os.environ.setdefault("OPENAI_API_KEY", key)
print(os.environ["OPENAI_API_KEY"])
llm = OpenAI(temperature=0.9)
prompt = PromptTemplate(
    input_variables=["website"],
    template="What are the 10 best node packages to achieve for me to achieve my project, {website}?",
)
createSiteChain = LLMChain(llm=llm, prompt=prompt)

#USER CONFIG
prompt = "What would be a good company name for a company that makes colorful socks?"
projectName = input("What would you like to be the name of your project?: ");
os.environ.setdefault("projectName", projectName)

projectDescription = input("Site description: ")
os.environ.setdefault("projectDescription", projectDescription)

projectDetailedFlow = input("Describe site flow: ")
os.environ.setdefault("projectDetailedFlow", projectDescription)

## - set prompt input
userWebsiteDescription = projectDescription + "" + projectDetailedFlow
os.environ.setdefault("website", userWebsiteDescription)

#EXECUTION
print(createSiteChain.run(os.environ["website"]))



#KEY_CHECK
# key = "OPENAI_API_KEY"
# print("KeyFound?..." + os.environ.get(key).lstrip(os.environ["OPENAI_API_KEY"]))
