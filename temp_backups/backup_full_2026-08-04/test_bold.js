const formatBold = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : '';
console.log(formatBold("**The Theatre of War (Key Battles)**\n\nThe Ypres Salient"));
