export const redirectUser = (ctx, location) => {
  if (ctx.req && ctx.asPath !== "/") {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  }
};
