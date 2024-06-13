export const handle = async({event, resolve}) => {
    const response = await resolve(event, {
      transformPageChunk: ({html}) => {
        let currentTheme = event.cookies.get("theme");
        if(!currentTheme) {
          currentTheme = "dark";
          event.cookies.set("theme", currentTheme)
        }
        return html.replace(`data-theme=""`, `data-theme="${currentTheme}"`);
      }
    });
    return response;
}