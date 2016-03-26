"use strict";
var ResourceNotFoundRoutingError_node_1 = require('../errors/ResourceNotFoundRoutingError.node');
var ResourceValidationError_node_1 = require('../errors/ResourceValidationError.node');
var DefaultRestService = (function () {
    function DefaultRestService(request, response, ModelClass, resourceName) {
        this._request = request;
        this._response = response;
        this._Model = ModelClass;
        this._resourceName = resourceName;
        try {
            this._resource = new ModelClass.resource(resourceName);
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(request.url.toString(), resourceName);
        }
    }
    DefaultRestService.prototype.get = function (id) {
        var data, out;
        try {
            data = this._resource.get(id);
        }
        catch (e) {
            throw new ResourceNotFoundRoutingError_node_1.ResourceNotFoundRoutingError(this._request.url.toString(), this._resourceName);
        }
        if (id) {
            out = this._Model.mapFrom(data, id).serialise();
        }
        else {
            out = [];
            for (var id_1 in data) {
                if (data.hasOwnProperty(id_1)) {
                    out.push(this._Model.mapFrom(data[id_1], id_1).serialise());
                }
            }
        }
        this._response.json(out);
    };
    DefaultRestService.prototype.delete = function (id) {
        this._response.json(this._resource.delete(id));
    };
    DefaultRestService.prototype.post = function (item) {
        if (!item.isValid) {
            throw new ResourceValidationError_node_1.ResourceValidationError(item._errors);
        }
        this._response.json(this._resource.post(item.mapTo()));
    };
    DefaultRestService.prototype.put = function (id, item) {
        if (!id) {
            throw new Error();
        }
        if (!item.isValid) {
            throw new ResourceValidationError_node_1.ResourceValidationError(item._errors);
        }
        this._response.json(this._resource.put(id, item.mapTo()));
    };
    return DefaultRestService;
}());
exports.DefaultRestService = DefaultRestService;