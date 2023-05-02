#IMPORTS
# - system
import os
from getpass import getpass
# - base
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# - Chat
from langchain.chat_models import ChatOpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

#AGENTS
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType

#TOOLS string:string
# get documents, db lookup?, 


#APP CONFIG
os.environ['OPENAI_API_KEY'] = getpass("OpenAI Key: ")
print(os.environ["OPENAI_API_KEY"])
createSiteLLM = ChatOpenAI(temperature=0.9)

requirements = "NodeJS, NextJS 13, tailwindcss"
packages = "Use markdown and .mdx files for pages, fluid UI with carosel of pictures on landing page"
closingTag = "Let's think step by step."

setupPrompt = PromptTemplate(
    input_variables=["requirements", "packages", "closingTag"],
    template="What packages are popular for building an app with {requirements} and {packages}. {closingTag}.",
)
setupPrompt.format(requirements=requirements, packages=packages, closingTag=closingTag)

prompt = PromptTemplate(
    input_variables=["website"],
    template="What are the 10 best node packages to achieve for me to achieve my project, {website}?",
)

# masterLLM = OpenAI(temperature=0.1)
# createSiteTools = load_tools(["requests"], llm=createSiteLLM) #specific website information
# createSiteTools = load_tools(["requests"], llm=createSiteLLM)
# createSiteTools = load_tools([""])
createSiteChain = LLMChain(llm=createSiteLLM, prompt=setupPrompt, verbose=True)
# createSiteAgent = initialize_agent(createSiteTools, createSiteLLM, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

#USER CONFIG
# prompt = "What would be a good company name for a company that makes colorful socks?"
# projectName = input("What would you like to be the name of your project?: ");
# os.environ.setdefault("projectName", projectName)

projectDescription = input("Site description: ")
os.environ.setdefault("projectDescription", projectDescription)

projectDetailedFlow = input("Describe site flow: ")
os.environ.setdefault("projectDetailedFlow", projectDescription)

## - set prompt input
userWebsiteDescription = projectDescription + "" + projectDetailedFlow
os.environ.setdefault("website", userWebsiteDescription)


#EXECUTION
print(createSiteChain.run({'requirements': requirements, 'packages': packages, 'closingTag': closingTag}))
# print(createSiteChain.run(os.environ["website"], requirements, packages, closingTag))
# createSiteAgent.run(createSiteChain)









# os.environ["OPENAI_API_KEY"] = "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"

#KEY_CHECK
# key = "OPENAI_API_KEY"
# print("KeyFound?..." + os.environ.get(key).lstrip("sk-iZwVMrEeSSgqI773up90T3BlbkFJtR9LI5vwSp"))
