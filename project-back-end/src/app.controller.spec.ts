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
    it('should register a new salon and return success message', async () => {
      // Dados simulados para registro de um novo salão
      const salaoData = {
        cpf_salao: '1020304050',
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

      expect(result).toBe('cadastrado com sucesso');
    });

    it('should return "salão já cadastrado" if salon already exists', async () => {
      // Dados simulados para registro de um salão que já existe
      const salaoData = {
        cpf_salao: '10203040', // CPF que já existe na base de dados
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
      jest.spyOn(connection('salao'), 'where').mockResolvedValue([{ cpf_salao: '38860300835' }]);

      const result = await salaoRegister.Register(salaoData);

      expect(result).toBe('salão já cadastrado');
    });
  });
});
