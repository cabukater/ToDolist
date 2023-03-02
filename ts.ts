describe('startCharon', () => {
  it('should emit the relations and charon session when a response is received', () => {
    const relations = [{ rel: 'some_rel', href: 'some_href' }];
    const charonSession = 'some_session';
    const response = {
      type: 'response',
      headers: {
        get: jest.fn().mockReturnValue(charonSession),
      },
    } as any;

    charonServiceMock.initialize.mockReturnValue({
      subscribe: jest.fn((callback) => {
        callback(response);
      }),
    } as any);
    charonServiceMock.getRelations.mockReturnValue(relations);

    const emitlistSpy = jest.spyOn(caronteService.emitList, 'next');
    const getSessionSpy = jest.spyOn(caronteService.getSession, 'next');

    caronteService.startCharon('some_token');

    expect(emitlistSpy).toHaveBeenCalledWith(relations);
    expect(getSessionSpy).toHaveBeenCalledWith(charonSession);
  });
});
