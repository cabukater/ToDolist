describe('CaronteService', () => {
  let caronteService: CaronteService;
  let charonServiceMock: jest.Mocked<CharonService>;

  beforeEach(() => {
    charonServiceMock = {
      initialize: jest.fn(),
      getRelations: jest.fn(),
    } as jest.Mocked<CharonService>;

    caronteService = new CaronteService(charonServiceMock);
  });

  describe('startCharon', () => {
    it('should call charonService.initialize with the correct parameters', () => {
      const token = 'some_token';

      caronteService.startCharon(token);

      expect(charonServiceMock.initialize).toHaveBeenCalledWith(
        'charon_entrypoint',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-itau-correlationID': expect.any(String),
            apikey: 'some_apikey',
          },
          observe: 'response',
        }
      );
    });

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
});
