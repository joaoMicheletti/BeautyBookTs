export class AjustesDto {
    cpf:string;
    logo_salao: string;
    cpf_salao:string;
    cpf_funcionario:string;
    intervalo_entre_agendamentos: string;
    agendamento_apos_hora_atual:string;
    permitir_agendamento_ate:string;
    senha: string;
    nome_salao:string;
    endereco:string;
    cep:string;
    email:string;
};
export class UploadImagemDto {
    file: Express.Multer.File;
    data: AjustesDto;
};