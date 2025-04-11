export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
  
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // 'Nov'
    const year = date.getFullYear();
  
    const getDaySuffix = (d: number) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };
  