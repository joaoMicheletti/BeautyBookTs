import { Test, TestingModule } from '@nestjs/testing';
import { SalaoRegister } from './providers/salao.providers/register.service';
import connection from './database/connection'; // Ajuste o caminho conforme necessário

describe('SalaoRegister', () => {
  let salaoRegister: SalaoRegister;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [SalaoRegister],
    }).compile();

    salaoRegister = moduleRef.get<SalaoRegister>(SalaoRegister);
  });

  describe('Register', () => {
    it('Register a new salon', async () => {
      // Dados simulados para registro de um novo salão
      const salaoData = {
        cpf_salao: '4155216280000', // cpf ficticio
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

    it('Search registered salon', async () => {
      // Dados simulados para registro de um salão que já existe
      const salaoData = {
        cpf_salao: '415521628000', // CPF que já existe na base de dados
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
  });
});
