﻿
using DIFECMS.Domain.Models;
using DIFECMS.Domain.Models.Configuration;
using DIFECMS.Domain.ViewModel;
using DIFECMS.Repository.Contracts;
using DIFECMS.Repository.Contracts.Configuration;
using DIFECMS.Repository.Implementations.Configuration;
using DIFECMS.Service.Contracts.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIFECMS.Service.Implementations.Configuration
{
    public class LawyerFacade : ILawyerFacade
    {
      private readonly ILawyerRepository _lawyerRepository;
      public LawyerFacade(ILawyerRepository lawyerRepository)
      {
      _lawyerRepository = lawyerRepository;
      }
      public IEnumerable<Lawyer> Get()
      {
         return _lawyerRepository.Get();
      }
      public IEnumerable<Lawyer> GetLawyerWithDistrict()
      {
         return _lawyerRepository.GetLawyerWithDistrict();
      }
      public SaveVM Save(Lawyer lawyer)
      {
         return _lawyerRepository.Save(lawyer);
      }
   }
}
