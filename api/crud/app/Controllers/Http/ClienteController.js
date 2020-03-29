'use strict'
const Cliente = use("App/Models/Cliente");
class ClienteController {
    

	async index({ request, response, view }) {
		const clientes = await Cliente.all();
		
		return clientes;
	}

	async store({ request, response }) {
		const data = request.only(["nome", "e-mail"]);
		
		const cliente = await Cliente.create(data);
		
		return cliente;
	}

	async update({ params, request, response }) {
		const cliente = await Cliente.findOrFail(params.id);
		const data = request.only(["nome", "e-mail"]);
		
		cliente.merge(data);
		await cliente.save();
		
		return cliente
	}

	async destroy({ params, request, response }) {
		const cliente = await Cliente.findOrFail(params.id);
		await cliente.delete();
	}
}
module.exports = ClienteController;

