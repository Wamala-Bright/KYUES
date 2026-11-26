/**
 * Session-backed flash messages that are consumed on the next request.
 */
const flashMiddleware = (req, res, next) => {
  if (!req.session) {
    return next(new Error('Flash messages require session middleware.'));
  }

  req.flash = (type, message) => {
    if (typeof type === 'undefined') {
      const messages = req.session.flashMessages || {};
      delete req.session.flashMessages;
      return messages;
    }

    if (typeof message === 'undefined') {
      const messages = req.session.flashMessages || {};
      const selected = messages[type] || [];
      delete messages[type];
      if (Object.keys(messages).length === 0) {
        delete req.session.flashMessages;
      }
      return selected;
    }

    req.session.flashMessages ||= {};
    req.session.flashMessages[type] ||= [];
    req.session.flashMessages[type].push(String(message));
    return req.session.flashMessages[type].length;
  };

  next();
};

const flashLocals = (req, res, next) => {
  res.locals.flash = () => req.flash();
  next();
};

const flash = (req, res, next) => {
  flashMiddleware(req, res, (error) => {
    if (error) return next(error);
    return flashLocals(req, res, next);
  });
};

export { flashMiddleware, flashLocals };
export default flash;
