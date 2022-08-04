import routes from './user.route';
import Controller from '../controllers/userController';

describe('User Route Test Suite', () => {
  it('/ path must refer to the UserController.store', async() => {
    const { route: { path, stack, methods } } = routes.stack[0];

    expect(path).toBe('/');
    expect(methods).toMatchObject({ post: true });

    // The controller should be the last of stack.
    const controller = stack[stack.length - 1].handle;
    expect(controller).toBe(Controller.store);
  });

  it('/:id path must refer to the UserController.update', async() => {
    const { route: { path, stack, methods } } = routes.stack[1];

    expect(path).toBe('/:id');
    expect(methods).toMatchObject({ put: true });

    // The controller should be the last of stack.
    const controller = stack[stack.length - 1].handle;
    expect(controller).toBe(Controller.update);
  });

  it('/:id path must refer to the UserController.destroy', async() => {
    const { route: { path, stack, methods } } = routes.stack[2];

    expect(path).toBe('/:id');
    expect(methods).toMatchObject({ delete: true });

    // The controller should be the last of stack.
    const controller = stack[stack.length - 1].handle;
    expect(controller).toBe(Controller.destroy);
  });
});
