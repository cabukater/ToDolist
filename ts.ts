it('should emit the relations and charon when a response is received', () => {
    const data = { relations: [], charon: {} };
    const response = new HttpResponse({ body: data });
    const eventSpy = spyOn(eventManager, 'broadcast');
    const getSessionSpy = spyOn(sessionService, 'getSession').and.returnValue(of({ token: '123' }));

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('/api/test');
      expect(connection.request.headers.get('Authorization')).toEqual('Bearer 123');
      connection.mockRespond(response);
    });

    service.getTest().subscribe(() => {
      expect(getSessionSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith('testFetched', data);
    });
  });
