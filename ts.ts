describe('startCharon', () => {
  let emitlistSpy: jest.SpyInstance;
  let getSessionSpy: jest.SpyInstance;
  let charonServiceMock: any;
  let caronteService: CaronteService;
  const token = 'some_token';

  beforeEach(() => {
    emitlistSpy = jest.spyOn(caronteService.emitlist, 'next');
    getSessionSpy = jest.spyOn(caronteService.getSession, 'next');
    charonServiceMock = {
      initialize: jest.fn().mockReturnValue({
        subscribe: jest.fn((callback) => {
          const response = {
            type: HttpEventType.Response,
            headers: {
              get: jest.fn().mockReturnValue('some_session'),
            },
          } as any;
          callback(response);
        }),
      }),
      getRelations: jest.fn().mockReturnValue([{ rel: 'some_rel', href: 'some_href' }]),
    };
    caronteService = new CaronteService(charonServiceMock as any);
  });

  it('should emit the relations and charon session when a response is received', () => {
    caronteService.startCharon(token);

    expect(charonServiceMock.initialize).toHaveBeenCalledWith(environment.charonEntrypoint, {
      headers: expect.any(HttpHeaders),
      observe: 'response',
    });
    expect(charonServiceMock.getRelations).toHaveBeenCalled();
    expect(emitlistSpy).toHaveBeenCalledWith([{ rel: 'some_rel', href: 'some_href' }]);
    expect(getSessionSpy).toHaveBeenCalledWith('some_session');
  });
});
