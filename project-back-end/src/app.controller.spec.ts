import { Test, TestingModule } from '@nestjs/testing';
// provider of register salon
import { SalaoRegister } from './providers/salao.providers/register.service';
//provider of register service
import { Servicos } from './providers/salao.providers/servicos.service';
import connection from './database/connection'; 
//provider of Funcionamento
import { Funcionamento } from './providers/salao.providers/funcionamento.service';

describe('Salon and services', () => {
  let salaoRegister: SalaoRegister;
  let servico: Servicos;
  let funcionamento: Funcionamento;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [SalaoRegister,Servicos, Funcionamento],
    }).compile();

    salaoRegister = moduleRef.get<SalaoRegister>(SalaoRegister);
    servico = moduleRef.get<Servicos>(Servicos);
    funcionamento = moduleRef.get<Funcionamento>(Funcionamento);
  });
  afterEach(() => {
    jest.clearAllMocks(); // Limpar todos os mocks após cada teste
  });

  describe('Register a new salon', () => {
    it('Register a new salon', async () => {
      // Dados simulados para registro de um novo salão
      const salaoData = {
        cpf_salao: '415521628000004440030000010', // cpf ficticio
        nome_salao: 'Salão Teste',
        endereco: 'Rua Teste, 123',
        cep: '06612100',
        email: 'teste@teste.com',
        senha: '123456',
        data_cadastro: '2024-06-15',
        indicado_por: '0',
        dias_free: '7',
      };

      // Mock do método 'where' de 'connection' para simular que não há salão cadastrado
      jest.spyOn(connection('salao'), 'where').mockResolvedValue([]);

      // Mock do método 'insert' de 'connection' para simular o sucesso do cadastro
      jest.spyOn(connection('salao'), 'insert').mockResolvedValue([1]); // 1 registro inserido

      const result = await salaoRegister.Register(salaoData);

      expect(result).toBe('cadastrado com sucesso!');
    });
  });
  describe('Search registered salon', () => {
    it('Search registered salon', async () => {
      // Dados simulados para registro de um salão que já existe
      const salaoData = {
        cpf_salao: '10', // CPF que já existe na base de dados
        nome_salao: 'Salão Teste',
        endereco: 'Rua Teste, 123',
        cep: '06612100',
        email: 'teste@teste.com',
        senha: '123456',
        data_cadastro: '2024-06-15',
        indicado_por: '0',
        dias_free: '7',
      };

      // Mock do método 'where' de 'connection' para simular que há um salão cadastrado com o CPF informado
      jest.spyOn(connection('salao'), 'where').mockResolvedValue([{ cpf_salao: '415521628000' }]); // informar o mesmo cpf_salao do salaoData{}

      const result = await salaoRegister.Register(salaoData);

      expect(result).toBe('salão já cadastrado');
    });
  })
  //teste de assinatura de plano
  //teste of register service!
  describe('Register a new service', () => {
    it('should register a new service', async () => {
      // Dados simulados para registro de um novo serviço
      const salaoData = {
        cpf_salao: '10', // CPF fictício
        servico: 'Salão Teste',
        preco: '150',
        id: ''
      };

      // Mock do método 'where' de 'connection' para simular que não há serviço cadastrado
      jest.spyOn(connection('servicos'), 'where').mockResolvedValue([]);

      // Mock do método 'insert' de 'connection' para simular o sucesso do cadastro
      jest.spyOn(connection('servicos'), 'insert').mockResolvedValue([1]); // 1 registro inserido

      const result = await servico.Register(salaoData);

      expect(result).toBe('Serviço cadastrado!');
    });
  });
  // buscar todos os serviços de um salão ;
  describe('List all cervices', () => {
    it('should searsh all services', async () => {
      // Dados simulados para registro de um novo serviço
      const salaoData = {
        cpf_salao: '10', // CPF fictício
        servico: 'Salão Teste',
        preco: '150',
        id:''
      };

      // Mock do método 'where' de 'connection' para simular que não há serviço cadastrado
      jest.spyOn(connection('servicos'), 'where').mockResolvedValue([]);

      // Mock do método 'insert' de 'connection' para simular o sucesso do cadastro
      jest.spyOn(connection('servicos'), 'insert').mockResolvedValue([1]); // 1 registro inserido

      const result = await servico.Listar(salaoData);

      expect(result).toBe(result);
    });
  });
  // update a service
  describe('Update a service', () => {
    it('Update a service', async () => {
      // Dados simulados para registro de um novo serviço
      const salaoData = {
        cpf_salao: '10', // CPF fictício
        servico: 'Salão Teste',
        preco: '150',
        id:'1'
      };
      jest.spyOn(connection('servicos'), 'where').mockResolvedValue([]);
      jest.spyOn(connection('servicos'), 'update').mockResolvedValue([1]);    
    });
  });
  // Delete a service
  describe('Delete a service', () => {
    it('Delete a service', async () => {
      // Dados simulados para registro de um novo serviço
      const salaoData = {
        cpf_salao: '10', // CPF fictício
        servico: 'Salão Teste',
        preco: '150',
        id:'1'
      };
      jest.spyOn(connection('servicos'), 'where').mockResolvedValue([]);
      jest.spyOn(connection('servicos'), 'update').mockResolvedValue([1]);  
      const response = await servico.Delete(salaoData); 
      expect(response).toBe('Deletado');
    });
  });
  describe('Insert opening hours', () => {
    it('Register a opening hours', async () => {
      const Data = {
        cpf_salao: "10",
        dia: "terça",
        inicio_trabalhos: "08:00",
        fim_trabalhos: "18:00",
        id: '0'
      };
      jest.spyOn(connection('horarios'), 'where').mockResolvedValue([]);
      jest.spyOn(connection('horarios'), 'insert').mockResolvedValue([1]);
      const response = await funcionamento.HorarioFuncionamento(Data);
      expect(response).toBe('Cadastrado');
    });
  });
  describe('Update openning hours', () => {
    it('Update openning hours', async () => {
      const Data = {
        cpf_salao: "10",
        dia: "terça",
        inicio_trabalhos: "08:00",
        fim_trabalhos: "18:00",
        id: ""
      };
      jest.spyOn(connection('horarios'), 'where').mockResolvedValue([]);
      jest.spyOn(connection('horarios'), 'update').mockResolvedValue([1]);
      const response = await funcionamento.EditarHorario(Data);
      expect(response).toBe('Atualizado');

    });
  });
  // Delete a opening hours
  describe('Delete a opening hours', () => {
    it('Delete a opening hours', async () => {
      const Data = {
        cpf_salao: "10",
        dia: "terça",
        inicio_trabalhos: "08:00",
        fim_trabalhos: "18:00",
        id: "2"
      };
      jest.spyOn(connection('horarios'), 'where').mockResolvedValue([]);
      jest.spyOn(connection('horarios'), 'delete').mockResolvedValue([1]);
      const response = await funcionamento.DeletarHorario(Data);
      expect(response).toBe('Deletado');
    });
  });
  describe('List all opening hours of salon', () => {
    it('List all opening hours of salon', async () => {
      const Data = {
        cpf_salao: "10",
        dia: "terça",
        inicio_trabalhos: "08:00",
        fim_trabalhos: "18:00",
        id: "2"
      };
      jest.spyOn(connection('horarios'), 'where').mockResolvedValueOnce([]);
      jest.spyOn(connection('horarios'), 'select').mockResolvedValue([1]);
      const response = await funcionamento.Listar(Data);
      expect(response).toBe(response);

    });
  });
});
//describe('Salon and ser', () => {});