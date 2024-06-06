import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeBlocks(message: string) {
  if (message.includes("```")) {
    const codeBlocks = message.split("```");
    return codeBlocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const codeBlocks = extractCodeBlocks(content);
  let codingLanguage: string;
  if (codeBlocks) {
    codingLanguage = codeBlocks[1].split("\n")[0];
  }
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 1,
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="OpenAI" width={"30px"} />
      </Avatar>
      <Box>
        {!codeBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {codeBlocks &&
          codeBlocks.length &&
          codeBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language={codingLanguage}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!codeBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {codeBlocks &&
          codeBlocks.length &&
          codeBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language={codingLanguage}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
