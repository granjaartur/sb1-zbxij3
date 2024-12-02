import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          app: {
            title: 'Payment Management',
            changeLanguage: 'Change Language',
          },
          common: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            loading: 'Loading...',
            error: 'An error occurred',
            success: 'Operation successful',
            actions: 'Actions',
            close: 'Close',
          },
          auth: {
            login: 'Login',
            logout: 'Logout',
            email: 'Email',
            password: 'Password',
          },
          members: {
            title: 'Members',
            add: 'Add Member',
            edit: 'Edit Member',
            delete: 'Delete Member',
            personalInfo: 'Personal Information',
            identification: 'Identification',
            contact: 'Contact Information',
            education: 'Education/Professional',
            name: 'Name',
            age: 'Age',
            observations: 'Observations',
            documentId: 'ID Document',
            taxId: 'Tax ID',
            gender: {
              label: 'Gender',
              male: 'Male',
              female: 'Female',
              other: 'Other'
            },
            maritalStatus: {
              label: 'Marital Status',
              single: 'Single',
              married: 'Married',
              divorced: 'Divorced',
              widowed: 'Widowed',
              other: 'Other'
            },
            birthDate: 'Date of Birth',
            email: 'Email',
            phone: 'Phone',
            mobile: 'Mobile',
            address: 'Address',
            academicDegree: 'Academic Degree',
            school: 'School',
            fieldOfStudy: 'Field of Study',
            profession: 'Profession',
            training: 'Professional Training'
          },
          groups: {
            title: 'Groups',
            add: 'Add Group',
            edit: 'Edit Group',
            delete: 'Delete Group',
            members: 'Group Members',
            name: 'Name',
            description: 'Description',
            noMembers: 'No members in this group'
          },
          services: {
            title: 'Services',
            add: 'Add Service',
            edit: 'Edit Service',
            delete: 'Delete Service',
            name: 'Name',
            description: 'Description',
            price: 'Price',
            tax: 'Tax',
            category: 'Category',
            group: 'Group',
            noGroup: 'No Group',
            frequency: {
              label: 'Frequency',
              weekly: 'Weekly',
              monthly: 'Monthly',
              quarterly: 'Quarterly',
              yearly: 'Yearly'
            },
            categories: 'Categories',
            category: {
              add: 'Add Category',
              edit: 'Edit Category',
              delete: 'Delete Category',
              name: 'Category Name',
              description: 'Category Description',
              services: 'Services'
            }
          },
          payments: {
            title: 'Payments',
            add: 'Add Payment',
            edit: 'Edit Payment',
            delete: 'Delete Payment',
            member: 'Member',
            service: 'Service',
            amount: 'Amount',
            dueDate: 'Due Date',
            paidDate: 'Paid Date',
            reference: 'Reference',
            status: {
              label: 'Status',
              pending: 'Pending',
              paid: 'Paid',
              overdue: 'Overdue',
              cancelled: 'Cancelled'
            },
            methods: {
              mb: 'Multibanco',
              mbway: 'MB WAY',
              mbDescription: 'Pay using Multibanco reference',
              mbwayDescription: 'Pay instantly using your phone'
            },
            selectMethod: 'Select Payment Method',
            processing: 'Processing payment...',
            referenceGenerated: 'Payment Reference Generated',
            referenceInstructions: 'Use this reference to complete your payment',
            processPayment: 'Process Payment',
            overdue: 'Payment Overdue'
          }
        }
      },
      pt: {
        translation: {
          app: {
            title: 'Gestão de Pagamentos',
            changeLanguage: 'Mudar Idioma',
          },
          common: {
            save: 'Guardar',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            edit: 'Editar',
            loading: 'A carregar...',
            error: 'Ocorreu um erro',
            success: 'Operação bem sucedida',
            actions: 'Ações',
            close: 'Fechar'
          },
          auth: {
            login: 'Entrar',
            logout: 'Sair',
            email: 'Email',
            password: 'Palavra-passe'
          },
          members: {
            title: 'Membros',
            add: 'Adicionar Membro',
            edit: 'Editar Membro',
            delete: 'Eliminar Membro',
            personalInfo: 'Informação Pessoal',
            identification: 'Identificação',
            contact: 'Informação de Contacto',
            education: 'Educação/Profissional',
            name: 'Nome',
            age: 'Idade',
            observations: 'Observações',
            documentId: 'Documento de Identificação',
            taxId: 'NIF',
            gender: {
              label: 'Género',
              male: 'Masculino',
              female: 'Feminino',
              other: 'Outro'
            },
            maritalStatus: {
              label: 'Estado Civil',
              single: 'Solteiro(a)',
              married: 'Casado(a)',
              divorced: 'Divorciado(a)',
              widowed: 'Viúvo(a)',
              other: 'Outro'
            },
            birthDate: 'Data de Nascimento',
            email: 'Email',
            phone: 'Telefone',
            mobile: 'Telemóvel',
            address: 'Morada',
            academicDegree: 'Grau Académico',
            school: 'Escola',
            fieldOfStudy: 'Área de Estudo',
            profession: 'Profissão',
            training: 'Formação Profissional'
          },
          groups: {
            title: 'Grupos',
            add: 'Adicionar Grupo',
            edit: 'Editar Grupo',
            delete: 'Eliminar Grupo',
            members: 'Membros do Grupo',
            name: 'Nome',
            description: 'Descrição',
            noMembers: 'Sem membros neste grupo'
          },
          services: {
            title: 'Serviços',
            add: 'Adicionar Serviço',
            edit: 'Editar Serviço',
            delete: 'Eliminar Serviço',
            name: 'Nome',
            description: 'Descrição',
            price: 'Preço',
            tax: 'IVA',
            category: 'Categoria',
            group: 'Grupo',
            noGroup: 'Sem Grupo',
            frequency: {
              label: 'Frequência',
              weekly: 'Semanal',
              monthly: 'Mensal',
              quarterly: 'Trimestral',
              yearly: 'Anual'
            },
            categories: 'Categorias',
            category: {
              add: 'Adicionar Categoria',
              edit: 'Editar Categoria',
              delete: 'Eliminar Categoria',
              name: 'Nome da Categoria',
              description: 'Descrição da Categoria',
              services: 'Serviços'
            }
          },
          payments: {
            title: 'Pagamentos',
            add: 'Adicionar Pagamento',
            edit: 'Editar Pagamento',
            delete: 'Eliminar Pagamento',
            member: 'Membro',
            service: 'Serviço',
            amount: 'Valor',
            dueDate: 'Data de Vencimento',
            paidDate: 'Data de Pagamento',
            reference: 'Referência',
            status: {
              label: 'Estado',
              pending: 'Pendente',
              paid: 'Pago',
              overdue: 'Em Atraso',
              cancelled: 'Cancelado'
            },
            methods: {
              mb: 'Multibanco',
              mbway: 'MB WAY',
              mbDescription: 'Pagar usando referência Multibanco',
              mbwayDescription: 'Pagar instantaneamente usando o telemóvel'
            },
            selectMethod: 'Selecionar Método de Pagamento',
            processing: 'A processar pagamento...',
            referenceGenerated: 'Referência de Pagamento Gerada',
            referenceInstructions: 'Use esta referência para completar o seu pagamento',
            processPayment: 'Processar Pagamento',
            overdue: 'Pagamento em Atraso'
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });